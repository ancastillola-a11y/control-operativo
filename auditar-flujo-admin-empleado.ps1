$salida = "auditoria-flujo-admin-empleado.txt"
Remove-Item -Path $salida -Force -ErrorAction SilentlyContinue

function Titulo {
  param([string]$texto)

  Add-Content -Path $salida -Value ""
  Add-Content -Path $salida -Value ""
  Add-Content -Path $salida -Value "============================================================"
  Add-Content -Path $salida -Value $texto
  Add-Content -Path $salida -Value "============================================================"
  Add-Content -Path $salida -Value ""
}

function AgregarArchivo {
  param([string]$ruta)

  Titulo "ARCHIVO: $ruta"

  if (Test-Path $ruta) {
    Get-Content -Path $ruta -Raw | Add-Content -Path $salida
  } else {
    Add-Content -Path $salida -Value "NO EXISTE: $ruta"
  }
}

function BuscarPatron {
  param(
    [string]$titulo,
    [string[]]$patrones
  )

  Titulo $titulo

  $archivos = Get-ChildItem -Path "src\app" -Recurse -File |
    Where-Object {
      $_.Extension -in ".ts", ".html", ".css" -and
      $_.FullName -notmatch "\\node_modules\\|\\.angular\\|\\www\\"
    }

  foreach ($patron in $patrones) {
    Add-Content -Path $salida -Value ""
    Add-Content -Path $salida -Value "---- BUSCANDO: $patron ----"

    $resultados = $archivos | Select-String -Pattern $patron -SimpleMatch -ErrorAction SilentlyContinue

    if ($resultados) {
      $resultados | ForEach-Object {
        Add-Content -Path $salida -Value "$($_.Path):$($_.LineNumber): $($_.Line.Trim())"
      }
    } else {
      Add-Content -Path $salida -Value "NO SE ENCONTRÓ: $patron"
    }
  }
}

Titulo "OBJETIVO DE ESTA AUDITORÍA"
Add-Content -Path $salida -Value "Revisar si el flujo Administrador ↔ Empleado es coherente:"
Add-Content -Path $salida -Value "1. Admin registra empleados activos."
Add-Content -Path $salida -Value "2. Admin registra materiales y stock."
Add-Content -Path $salida -Value "3. Admin crea trabajo, asigna empleados y materiales."
Add-Content -Path $salida -Value "4. Al crear trabajo se descuentan materiales."
Add-Content -Path $salida -Value "5. Empleado ve solo sus trabajos."
Add-Content -Path $salida -Value "6. Empleado cambia estados: pendiente, en_camino, en_proceso, finalizado."
Add-Content -Path $salida -Value "7. Empleado registra materiales usados y sobrantes."
Add-Content -Path $salida -Value "8. Si hay sobrantes pasa a devolucion_pendiente."
Add-Content -Path $salida -Value "9. Devolución con código."
Add-Content -Path $salida -Value "10. Stock se suma solo al validar devolución."
Add-Content -Path $salida -Value "11. Admin puede cerrar el trabajo."

Titulo "ESTRUCTURA GENERAL src/app"
Get-ChildItem -Path "src\app" -Recurse |
  Where-Object { $_.FullName -notmatch "\\node_modules\\|\\.angular\\|\\www\\" } |
  Select-Object -ExpandProperty FullName |
  Add-Content -Path $salida

Titulo "ARCHIVOS RELEVANTES DETECTADOS"
Get-ChildItem -Path "src\app" -Recurse -File |
  Where-Object {
    $_.Extension -in ".ts", ".html", ".css" -and
    $_.FullName -match "admin|empleado|trabajo|trabajos|devolucion|devoluciones|material|materiales|gps|codigo|codigos|notificacion|notificaciones|asignacion|seguimiento|reporte|reportes|finanzas" -and
    $_.FullName -notmatch "\\node_modules\\|\\.angular\\|\\www\\"
  } |
  Select-Object -ExpandProperty FullName |
  Add-Content -Path $salida

Titulo "RUTAS DEL SISTEMA"
AgregarArchivo "src\app\app.routes.ts"

Titulo "MODELOS PRINCIPALES"
AgregarArchivo "src\app\modelos\dashboard-empleado.ts"
AgregarArchivo "src\app\modelos\empleado.ts"
AgregarArchivo "src\app\modelos\material.ts"
AgregarArchivo "src\app\modelos\trabajo.ts"
AgregarArchivo "src\app\modelos\devolucion.ts"

Titulo "SERVICES Y DAO DEL EMPLEADO"
AgregarArchivo "src\app\procesos\dashboard-empleado.service.ts"
AgregarArchivo "src\app\dao\dashboard-empleado.dao.ts"
AgregarArchivo "src\app\procesos\gps-empleado.service.ts"

Titulo "SERVICES Y DAO DEL ADMIN / TRABAJOS / MATERIALES / DEVOLUCIONES"
AgregarArchivo "src\app\dao\empleado.dao.ts"
AgregarArchivo "src\app\dao\material.dao.ts"
AgregarArchivo "src\app\dao\trabajo.dao.ts"
AgregarArchivo "src\app\dao\devolucion.dao.ts"
AgregarArchivo "src\app\procesos\empleado.service.ts"
AgregarArchivo "src\app\procesos\material.service.ts"
AgregarArchivo "src\app\procesos\trabajo.service.ts"
AgregarArchivo "src\app\procesos\devolucion.service.ts"

Titulo "PANEL EMPLEADO CONTENEDOR"
AgregarArchivo "src\app\paginas\empleado\dashboard-empleado\dashboard-empleado.page.ts"
AgregarArchivo "src\app\paginas\empleado\dashboard-empleado\dashboard-empleado.page.html"
AgregarArchivo "src\app\paginas\empleado\dashboard-empleado\dashboard-empleado.page.css"

Titulo "MÓDULOS DEL PANEL EMPLEADO"
$rutaModulosEmpleado = "src\app\paginas\empleado\dashboard-empleado\modulos"

if (Test-Path $rutaModulosEmpleado) {
  Get-ChildItem -Path $rutaModulosEmpleado -Recurse -File |
    Where-Object { $_.Extension -in ".ts", ".html", ".css" } |
    ForEach-Object {
      Add-Content -Path $salida -Value ""
      Add-Content -Path $salida -Value "------------------------------------------------------------"
      Add-Content -Path $salida -Value "ARCHIVO: $($_.FullName)"
      Add-Content -Path $salida -Value "------------------------------------------------------------"
      Get-Content -Path $_.FullName -Raw | Add-Content -Path $salida
    }
} else {
  Add-Content -Path $salida -Value "NO EXISTE LA CARPETA DE MÓDULOS DEL EMPLEADO."
}

Titulo "PÁGINAS ADMIN RELACIONADAS"
Get-ChildItem -Path "src\app\paginas" -Recurse -File |
  Where-Object {
    $_.Extension -in ".ts", ".html" -and
    $_.FullName -match "admin|empleados|materiales|asignacion-trabajos|seguimiento-trabajos|devoluciones|gps|reportes|finanzas|codigos"
  } |
  ForEach-Object {
    Add-Content -Path $salida -Value ""
    Add-Content -Path $salida -Value "------------------------------------------------------------"
    Add-Content -Path $salida -Value "ARCHIVO: $($_.FullName)"
    Add-Content -Path $salida -Value "------------------------------------------------------------"
    Get-Content -Path $_.FullName -Raw | Add-Content -Path $salida
  }

BuscarPatron "ESTADOS DEL TRABAJO EN TODO EL SISTEMA" @(
  "pendiente",
  "en_camino",
  "en_proceso",
  "finalizado",
  "devolucion_pendiente",
  "devolucion_realizada",
  "cerrado",
  "cancelado"
)

BuscarPatron "CREACIÓN Y ASIGNACIÓN DE TRABAJOS" @(
  "crearTrabajo",
  "crearTrabajoConAsignacion",
  "empleadosAsignados",
  "materialesAsignados",
  "codigoCliente",
  "codigoDevolucion",
  "cantidadAsignada",
  "stockActual",
  "stockMinimo"
)

BuscarPatron "DESCUENTO Y SUMA DE STOCK" @(
  "stockActual",
  "cantidadAsignada",
  "cantidadUsada",
  "cantidadDevuelta",
  "movimientos_materiales",
  "tipo: 'salida'",
  "tipo: 'entrada'",
  "moduloOrigen",
  "devolucion_materiales"
)

BuscarPatron "FLUJO DEL EMPLEADO" @(
  "marcarEnCamino",
  "iniciarTrabajo",
  "finalizarTrabajo",
  "registrarDevolucion",
  "registrarDevolucionEmpleado",
  "actualizarEstadoTrabajo",
  "activarSeguimiento",
  "desactivarSeguimiento",
  "obtenerUrlRutaGoogleMaps"
)

BuscarPatron "FLUJO DE DEVOLUCIONES ADMINISTRADOR" @(
  "validarDevolucion",
  "devolucionValidada",
  "devolucionRegistrada",
  "codigoDevolucion",
  "devoluciones",
  "devolucion_pendiente",
  "devolucion_realizada"
)

BuscarPatron "NOTIFICACIONES ENTRE EMPLEADO Y ADMIN" @(
  "notificaciones_admin",
  "notificacion",
  "notificarAdministrador",
  "leido",
  "ruta: '/devoluciones'",
  "ruta: '/seguimiento-trabajos'"
)

BuscarPatron "GPS Y SEGUIMIENTO" @(
  "gps",
  "ubicacion",
  "latitud",
  "longitud",
  "historial_ubicaciones",
  "trabajoUid",
  "empleadoUid"
)

Titulo "REGLAS QUE DEBE CUMPLIR EL FLUJO"
Add-Content -Path $salida -Value "REVISAR:"
Add-Content -Path $salida -Value "- No debe pasar a en_proceso si no estuvo en en_camino."
Add-Content -Path $salida -Value "- No debe pasar a finalizado sin materiales usados y estado de pago."
Add-Content -Path $salida -Value "- Si hay sobrantes, debe pasar a devolucion_pendiente."
Add-Content -Path $salida -Value "- Stock baja al asignar materiales desde admin."
Add-Content -Path $salida -Value "- Stock sube solo al validar devolución."
Add-Content -Path $salida -Value "- GPS debe asociarse al trabajoUid y empleadoUid."
Add-Content -Path $salida -Value "- Empleado solo ve sus trabajos asignados."
Add-Content -Path $salida -Value "- Admin ve todos los trabajos, materiales, empleados, devoluciones y reportes."

notepad $salida
