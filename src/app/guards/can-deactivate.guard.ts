import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-deactivate';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
