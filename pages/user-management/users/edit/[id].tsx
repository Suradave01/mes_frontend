import { userService } from "../../../../services/user-management";
import AddEdit from "../add";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const user = await userService.getById(params.id);

  return {
    props: { user },
  };
}
