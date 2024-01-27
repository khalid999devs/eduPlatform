import { useParams } from "react-router-dom";
import ChatBox from "../../Components/Admin/discussion/chat";
import { AdminConsumer } from "../admin/Admin";
const AdminChat = () => {
  const { id } = useParams();
  const { isAdmin } = AdminConsumer();
  return (
    <div className="h-full">
      <ChatBox courseId={id} isAdmin={isAdmin} />;
    </div>
  );
};
export default AdminChat;
