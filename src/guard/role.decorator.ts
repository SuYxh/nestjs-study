import { SetMetadata } from '@nestjs/common';

export const Role = (role: string[]) => {
  console.log('Role-->', role);
  return SetMetadata('role', role);
};
