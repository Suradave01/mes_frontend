import { AddEdit } from "../../../../components/user-management/resources";
import { resourceService } from "../../../../services/user-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const resource = await resourceService.getById(params.id);

  return {
    props: { resource },
  };
}
