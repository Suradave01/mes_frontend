import { AddEdit } from "../../../../components/planning-management/wip-flow/AddEdit";
import { wipFlowService } from "../../../../services/planning-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const wipFlow = await wipFlowService.getById(params.id);

  return {
    props: { wipFlow },
  };
}
