// functions/index.js
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();

function texto(valor) {
  return String(valor || '').trim();
}

function correoNormalizado(valor) {
  return String(valor || '').trim().toLowerCase();
}

async function validarAdministrador(request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debe iniciar sesión.');
  }

  const uid = request.auth.uid;

  const adminDoc = await db.collection('usuarios').doc(uid).get();

  if (!adminDoc.exists) {
    throw new HttpsError('permission-denied', 'Usuario administrador no encontrado.');
  }

  const admin = adminDoc.data();

  const esAdmin = admin.rol === 'admin';
  const estaHabilitado = admin.activo !== false && admin.estado !== false && admin.habilitado !== false;

  if (!esAdmin || !estaHabilitado) {
    throw new HttpsError('permission-denied', 'No tiene permisos de administrador.');
  }

  return {
    uid,
    correo: admin.correo || request.auth.token.email || '',
    nombre: admin.nombres || admin.usuario || admin.correo || 'Administrador'
  };
}

function validarEmpleado(data) {
  const nombres = texto(data.nombres);
  const apellidos = texto(data.apellidos);
  const correo = correoNormalizado(data.correo);
  const dni = texto(data.dni);
  const telefono = texto(data.telefono);
  const cargo = texto(data.cargo) || 'Personal operativo';

  if (!nombres) {
    throw new HttpsError('invalid-argument', 'Ingrese los nombres del empleado.');
  }

  if (!apellidos) {
    throw new HttpsError('invalid-argument', 'Ingrese los apellidos del empleado.');
  }

  if (!correo || !correo.includes('@')) {
    throw new HttpsError('invalid-argument', 'Ingrese un correo válido.');
  }

  if (!dni || dni.length < 8) {
    throw new HttpsError('invalid-argument', 'Ingrese un DNI válido.');
  }

  if (!telefono || telefono.length < 9) {
    throw new HttpsError('invalid-argument', 'Ingrese un teléfono válido.');
  }

  return {
    nombres,
    apellidos,
    nombreCompleto: `${nombres} ${apellidos}`.trim(),
    correo,
    dni,
    telefono,
    cargo
  };
}

async function validarDuplicados(correo, dni, uidIgnorado = '') {
  const correoSnap = await db
    .collection('usuarios')
    .where('correo', '==', correo)
    .limit(1)
    .get();

  if (!correoSnap.empty && correoSnap.docs[0].id !== uidIgnorado) {
    throw new HttpsError('already-exists', 'Ya existe un empleado con ese correo.');
  }

  const dniSnap = await db
    .collection('usuarios')
    .where('dni', '==', dni)
    .limit(1)
    .get();

  if (!dniSnap.empty && dniSnap.docs[0].id !== uidIgnorado) {
    throw new HttpsError('already-exists', 'Ya existe un empleado con ese DNI.');
  }
}

async function registrarHistorial(adminUid, accion, descripcion, empleadoUid) {
  await db.collection('historial_actividades').add({
    modulo: 'SM-1.2 Gestión de usuarios empleados',
    accion,
    descripcion,
    empleadoUid,
    realizadoPorUid: adminUid,
    createdAt: FieldValue.serverTimestamp()
  });
}

async function actualizarResumenEmpleados() {
  const snap = await db
    .collection('usuarios')
    .where('rol', '==', 'empleado')
    .where('habilitado', '==', true)
    .get();

  await db.collection('dashboard_admin').doc('resumen').set(
    {
      empleadosActivos: snap.size,
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
}

exports.crearEmpleado = onCall(async (request) => {
  const admin = await validarAdministrador(request);
  const data = validarEmpleado(request.data);

  await validarDuplicados(data.correo, data.dni);

  const passwordTemporal = Math.random().toString(36).slice(-8) + 'A1!';

  const userRecord = await getAuth().createUser({
    email: data.correo,
    password: passwordTemporal,
    displayName: data.nombreCompleto,
    disabled: false
  });

  await getAuth().setCustomUserClaims(userRecord.uid, {
    rol: 'empleado'
  });

  await db.collection('usuarios').doc(userRecord.uid).set({
    uid: userRecord.uid,
    nombres: data.nombres,
    apellidos: data.apellidos,
    nombreCompleto: data.nombreCompleto,
    correo: data.correo,
    usuario: data.correo.split('@')[0],
    dni: data.dni,
    telefono: data.telefono,
    cargo: data.cargo,
    rol: 'empleado',
    habilitado: true,
    activo: true,
    estado: true,
    authDisabled: false,
    fotoUrl: '',
    creadoPorUid: admin.uid,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });

  await registrarHistorial(
    admin.uid,
    'crear_empleado',
    `Se creó el empleado ${data.nombreCompleto}.`,
    userRecord.uid
  );

  await actualizarResumenEmpleados();

  return {
    ok: true,
    uid: userRecord.uid,
    correo: data.correo
  };
});

exports.editarEmpleado = onCall(async (request) => {
  const admin = await validarAdministrador(request);

  const uid = texto(request.data.uid);

  if (!uid) {
    throw new HttpsError('invalid-argument', 'UID de empleado requerido.');
  }

  const data = validarEmpleado(request.data);

  await validarDuplicados(data.correo, data.dni, uid);

  const empleadoRef = db.collection('usuarios').doc(uid);
  const empleadoDoc = await empleadoRef.get();

  if (!empleadoDoc.exists) {
    throw new HttpsError('not-found', 'Empleado no encontrado.');
  }

  await getAuth().updateUser(uid, {
    email: data.correo,
    displayName: data.nombreCompleto
  });

  await empleadoRef.set(
    {
      nombres: data.nombres,
      apellidos: data.apellidos,
      nombreCompleto: data.nombreCompleto,
      correo: data.correo,
      usuario: data.correo.split('@')[0],
      dni: data.dni,
      telefono: data.telefono,
      cargo: data.cargo,
      actualizadoPorUid: admin.uid,
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  await registrarHistorial(
    admin.uid,
    'editar_empleado',
    `Se actualizó el empleado ${data.nombreCompleto}.`,
    uid
  );

  return {
    ok: true,
    uid
  };
});

exports.cambiarAccesoEmpleado = onCall(async (request) => {
  const admin = await validarAdministrador(request);

  const uid = texto(request.data.uid);
  const habilitado = Boolean(request.data.habilitado);

  if (!uid) {
    throw new HttpsError('invalid-argument', 'UID de empleado requerido.');
  }

  const empleadoRef = db.collection('usuarios').doc(uid);
  const empleadoDoc = await empleadoRef.get();

  if (!empleadoDoc.exists) {
    throw new HttpsError('not-found', 'Empleado no encontrado.');
  }

  const empleado = empleadoDoc.data();

  await getAuth().updateUser(uid, {
    disabled: !habilitado
  });

  await empleadoRef.set(
    {
      habilitado,
      activo: habilitado,
      estado: habilitado,
      authDisabled: !habilitado,
      actualizadoPorUid: admin.uid,
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  await registrarHistorial(
    admin.uid,
    habilitado ? 'habilitar_empleado' : 'deshabilitar_empleado',
    `${habilitado ? 'Se habilitó' : 'Se deshabilitó'} el acceso de ${empleado.nombreCompleto || empleado.correo}.`,
    uid
  );

  await actualizarResumenEmpleados();

  return {
    ok: true,
    uid,
    habilitado
  };
});

exports.generarResetPasswordEmpleado = onCall(async (request) => {
  await validarAdministrador(request);

  const correo = correoNormalizado(request.data.correo);

  if (!correo) {
    throw new HttpsError('invalid-argument', 'Correo requerido.');
  }

  const link = await getAuth().generatePasswordResetLink(correo);

  return {
    ok: true,
    link
  };
});