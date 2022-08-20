import { AddEdit } from "../../../components/contact-management/AddEdit";
import { contactManagement } from "../../../services/contact-management";

export default AddEdit;

export async function getServerSideProps({ params }: any) {
  const contact = await contactManagement.findOneContact(params.id);

  return {
    props: { contact },
  };
}
