import { AddEdit } from "../../../../components/user-management/groups/AddEdit";
import { groupService } from "../../../../services/user-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const group = await groupService.getById(params.id);

  return {
    props: { group },
  };
}
