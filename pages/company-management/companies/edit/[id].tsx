import { AddEdit } from "../../../../components/company-management/companies/AddEdit";
import { companyService } from "../../../../services/company-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const company = await companyService.getById(params.id);

  return {
    props: { company },
  };
}
