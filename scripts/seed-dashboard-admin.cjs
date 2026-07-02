// scripts/seed-dashboard-admin.cjs
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

async function seedDashboardAdmin() {
  const batch = db.batch();

  // =====================================================
  // 1. CONFIGURACIÓN DE EMPRESA
  // =====================================================
  batch.set(
    db.collection('configuracion').doc('empresa'),
    {
      nombre: 'COMPROY S.A.C.',
      rubro: 'Consultoría Obras y',
      detalle: 'Mantenimiento de Proyectos S.A.C.',
      logoUrl: 'assets/img/admin/logo-empresa.png',
      bannerUrl: 'assets/img/admin/banner-obrero.png',
      activo: true,

      // Borra campos anteriores si ya fueron creados
      fechaCreacion: FieldValue.delete(),
      fechaActualizacion: FieldValue.delete()
    },
    { merge: true }
  );

  // =====================================================
  // 2. MÓDULOS DEL PANEL ADMINISTRADOR
  // =====================================================
  const modulosAdmin = [
    {
      id: 'trabajos',
      data: {
        titulo: 'Trabajos',
        ruta: '/lista-trabajos',
        iconoUrl: 'assets/img/admin/icon-trabajos.png',
        orden: 1,
        activo: true,
        color: 'azul',
        badgeTipo: 'trabajos_pendientes'
      }
    },
    {
      id: 'almacen',
      data: {
        titulo: 'Almacén',
        ruta: '/materiales',
        iconoUrl: 'assets/img/admin/icon-almacen.png',
        orden: 2,
        activo: true,
        color: 'azul',
        badgeTipo: 'stock_bajo'
      }
    },
    {
      id: 'empleados',
      data: {
        titulo: 'Empleados',
        ruta: '/empleados',
        iconoUrl: 'assets/img/admin/icon-empleados.png',
        orden: 3,
        activo: true,
        color: 'verde',
        badgeTipo: ''
      }
    },
    {
      id: 'gps',
      data: {
        titulo: 'GPS',
        ruta: '/gps',
        iconoUrl: 'assets/img/admin/icon-gps.png',
        orden: 4,
        activo: true,
        color: 'azul',
        badgeTipo: ''
      }
    },
    {
      id: 'reportes',
      data: {
        titulo: 'Reportes',
        ruta: '/reportes',
        iconoUrl: 'assets/img/admin/icon-reportes.png',
        orden: 5,
        activo: true,
        color: 'azul',
        badgeTipo: ''
      }
    },
    {
      id: 'notificaciones',
      data: {
        titulo: 'Notificaciones',
        ruta: '/notificaciones-admin',
        iconoUrl: 'assets/img/admin/icon-notificaciones.png',
        orden: 6,
        activo: true,
        color: 'gris',
        badgeTipo: 'notificaciones'
      }
    },
    {
      id: 'devoluciones',
      data: {
        titulo: 'Devoluciones',
        ruta: '/devoluciones',
        iconoUrl: 'assets/img/admin/icon-devoluciones.png',
        orden: 7,
        activo: true,
        color: 'azul',
        badgeTipo: ''
      }
    },
    {
      id: 'configuracion',
      data: {
        titulo: 'Configuración',
        ruta: '/configuracion-admin',
        iconoUrl: 'assets/img/admin/icon-configuracion.png',
        orden: 8,
        activo: true,
        color: 'gris',
        badgeTipo: ''
      }
    }
  ];

  modulosAdmin.forEach((modulo) => {
    batch.set(
      db.collection('modulos_admin').doc(modulo.id),
      {
        ...modulo.data,

        // Borra campos anteriores si existían
        fechaCreacion: FieldValue.delete(),
        fechaActualizacion: FieldValue.delete()
      },
      { merge: true }
    );
  });

  // =====================================================
  // 3. MATERIALES DE PRUEBA
  // =====================================================
  const materiales = [
    {
      id: 'cano-pvc-media',
      data: {
        nombre: 'Caño PVC 1/2',
        categoria: 'Caños',
        unidad: 'unidad',
        stockActual: 4,
        stockMinimo: 10,
        stockBajo: true,
        activo: true,
        imagenUrl: 'assets/img/materiales/cano-pvc.png'
      }
    },
    {
      id: 'codo-pvc-media',
      data: {
        nombre: 'Codo PVC 1/2',
        categoria: 'Accesorios',
        unidad: 'unidad',
        stockActual: 25,
        stockMinimo: 10,
        stockBajo: false,
        activo: true,
        imagenUrl: 'assets/img/materiales/codo-pvc.png'
      }
    },
    {
      id: 'pegamento-pvc',
      data: {
        nombre: 'Pegamento PVC',
        categoria: 'Insumos',
        unidad: 'unidad',
        stockActual: 3,
        stockMinimo: 8,
        stockBajo: true,
        activo: true,
        imagenUrl: 'assets/img/materiales/pegamento-pvc.png'
      }
    }
  ];

  materiales.forEach((material) => {
    batch.set(
      db.collection('materiales').doc(material.id),
      {
        ...material.data,

        // Borra campos anteriores si existían
        fechaCreacion: FieldValue.delete(),
        fechaActualizacion: FieldValue.delete()
      },
      { merge: true }
    );
  });

  // =====================================================
  // 4. TRABAJOS DE PRUEBA
  // =====================================================
  const trabajos = [
    {
      id: 'trabajo-prueba-001',
      data: {
        cliente: 'Juan Pérez',
        celular: '987654321',
        direccion: 'Av. Los Incas 450',
        tipoTrabajo: 'Instalación',
        fechaProgramada: '',
        horaProgramada: '',
        subtotal: 150,
        estado: 'pendiente',
        creadoPorUid: ''
      }
    },
    {
      id: 'trabajo-prueba-002',
      data: {
        cliente: 'María Torres',
        celular: '912345678',
        direccion: 'Jr. San Martín 120',
        tipoTrabajo: 'Mantenimiento',
        fechaProgramada: '',
        horaProgramada: '',
        subtotal: 180,
        estado: 'en_proceso',
        creadoPorUid: ''
      }
    }
  ];

  trabajos.forEach((trabajo) => {
    batch.set(
      db.collection('trabajos').doc(trabajo.id),
      {
        ...trabajo.data,

        // Borra campos anteriores si existían
        fechaCreacion: FieldValue.delete(),
        fechaActualizacion: FieldValue.delete()
      },
      { merge: true }
    );
  });

  // =====================================================
  // 5. NOTIFICACIONES DE PRUEBA
  // =====================================================
  const notificaciones = [
    {
      id: 'notificacion-stock-bajo-001',
      data: {
        titulo: 'Stock bajo',
        mensaje: 'El material Caño PVC 1/2 está por debajo del stock mínimo.',
        tipo: 'stock_bajo',
        paraRol: 'admin',
        leida: false,
        iconoUrl: 'assets/img/admin/icon-notificaciones.png'
      }
    },
    {
      id: 'notificacion-trabajo-001',
      data: {
        titulo: 'Nuevo trabajo pendiente',
        mensaje: 'Se registró un nuevo trabajo pendiente.',
        tipo: 'trabajo',
        paraRol: 'admin',
        leida: false,
        iconoUrl: 'assets/img/admin/icon-trabajos.png'
      }
    }
  ];

  notificaciones.forEach((notificacion) => {
    batch.set(
      db.collection('notificaciones').doc(notificacion.id),
      {
        ...notificacion.data,

        // Borra campos anteriores si existían
        fechaCreacion: FieldValue.delete(),
        fechaActualizacion: FieldValue.delete()
      },
      { merge: true }
    );
  });

  // =====================================================
  // 6. ACTUALIZAR TU USUARIO ADMIN SIN BORRAR SUS DATOS
  // =====================================================
  const adminSnapshot = await db
    .collection('usuarios')
    .where('rol', '==', 'admin')
    .limit(1)
    .get();

  if (!adminSnapshot.empty) {
    const adminDoc = adminSnapshot.docs[0];

    batch.set(
      db.collection('usuarios').doc(adminDoc.id),
      {
        activo: true,
        fotoUrl: 'assets/img/admin/perfil-admin.png',

        // Borra campos anteriores si existían
        fechaCreacion: FieldValue.delete(),
        fechaActualizacion: FieldValue.delete()
      },
      { merge: true }
    );

    console.log('✅ Usuario administrador encontrado y actualizado:', adminDoc.id);
  } else {
    console.log('⚠️ No se encontró usuario con rol admin. Revisa la colección usuarios.');
  }

  await batch.commit();

  console.log('✅ Firebase base del panel administrador cargado correctamente.');
  console.log('✅ Se eliminaron fechaCreacion y fechaActualizacion si existían.');
  console.log('ℹ️ La hora real del panel se hará desde Angular, no desde Firebase.');
}

seedDashboardAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error cargando Firebase inicial:', error);
    process.exit(1);
  });