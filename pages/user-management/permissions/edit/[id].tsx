import { AddEdit } from "../../../../components/user-management/permissions";
import { permissionService } from "../../../../services/user-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const permission = await permissionService.getById(params.id);

  return {
    props: { permission },
  };
}
