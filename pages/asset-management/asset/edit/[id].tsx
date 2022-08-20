import { AddEdit } from "../../../../components/asset-management/asset/AddEdit";
import { assetService } from "../../../../services/asset-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const asset = await assetService.getById(params.id);

  return {
    props: { asset },
  };
}
