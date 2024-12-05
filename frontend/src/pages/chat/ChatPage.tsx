import Header from "@/components/Header";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img
      src="/tunein.png"
      alt="TuneIn"
      className="rounded-full size-16 animate-bounce"
    />
    <div className="text-center">
      <h3 className="mb-1 text-lg font-medium text-zinc-300">
        No conversation selected
      </h3>
      <p className="text-sm text-zinc-500">Choose a friend to start chatting</p>
    </div>
  </div>
);

const formatTime = (date: string) => {
  const messageTime =
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) +
    " - " +
    new Date(date).toLocaleDateString("en-US", {
      dateStyle: "medium",
    });
  return messageTime;
};

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Header />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />
        {/* Message Section */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? "flex-row-reverse" : ""
                      }`}
                      key={message._id}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user?.imageUrl
                              : selectedUser?.imageUrl
                          }
                        />
                        <AvatarFallback>{user?.fullName![0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 max-w-[70%] ${
                          message.senderId === user?.id
                            ? "bg-emerald-500"
                            : "bg-zinc-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="block mt-1 text-xs text-zinc-300">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
