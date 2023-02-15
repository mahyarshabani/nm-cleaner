import { InjectionToken } from '@angular/core';
import { IElectronAPI } from '../type.d/renderer';

export const ELECTRON_API_TOKEN = new InjectionToken<IElectronAPI>('');
