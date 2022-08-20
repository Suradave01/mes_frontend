import { AddEdit } from "../../../../components/asset-management/trigger/AddEdit";
import { triggerService } from "../../../../services/asset-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const trigger = await triggerService.getById(params.id);

  return {
    props: { trigger },
  };
}
