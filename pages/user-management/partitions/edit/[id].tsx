import { AddEdit } from "../../../../components/user-management/partitions";
import { partitionService } from "../../../../services/user-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const partition = await partitionService.getById(params.id);

  return {
    props: { partition },
  };
}
