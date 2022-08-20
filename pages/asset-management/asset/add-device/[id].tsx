import { AddEditDevice } from "../../../../components/asset-management/asset/AddEditDevice";
import { assetService } from "../../../../services/asset-management";

export default AddEditDevice;

export async function getServerSideProps({ params }: any) {
  const asset = await assetService.getById(params.id);

  return {
    props: { asset },
  };
}
