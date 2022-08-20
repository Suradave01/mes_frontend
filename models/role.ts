export interface Role {
  Role: {
    id: number;
    role_name: string;
    role_description: string;
    MenuMappingRoles: {
      id: number;
      resource_name: string;
      resource_code: string;
      resource_type: string;
    };
  };
}
