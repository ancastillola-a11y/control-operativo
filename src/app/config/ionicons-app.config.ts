// src/app/config/ionicons-app.config.ts
import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  briefcaseOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  personOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

export function registrarIconosApp(): void {
  addIcons({
    'arrow-back-outline': arrowBackOutline,
    'briefcase-outline': briefcaseOutline,
    'eye-off-outline': eyeOffOutline,
    'eye-outline': eyeOutline,
    'lock-closed-outline': lockClosedOutline,
    'person-outline': personOutline,
    'shield-checkmark-outline': shieldCheckmarkOutline
  });
}