import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return;

  return (
    <div className="p-4 border-b-2 border-zinc-900">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser?.imageUrl} />
          <AvatarFallback>{selectedUser?.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser?.fullName}</h2>
          <p
            className={`text-sm ${
              onlineUsers.has(selectedUser?.clerkId)
                ? "text-green-500"
                : "text-zinc-500"
            }`}
          >
            {onlineUsers.has(selectedUser?.clerkId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
