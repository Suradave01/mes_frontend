import { AddEdit } from "../../../../components/user-management/roles";
import { roleService } from "../../../../services/user-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const role = await roleService.getById(params.id);

  return {
    props: { role },
  };
}
