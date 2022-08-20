import { AddEdit } from "../../../../components/planning-management/wip/AddEdit";
import { wipService } from "../../../../services/planning-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const wip = await wipService.getById(params.id);

  return {
    props: { wip },
  };
}
