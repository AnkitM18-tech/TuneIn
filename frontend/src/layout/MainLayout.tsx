import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="flex flex-col h-screen text-white bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full p-2 overflow-hidden"
      >
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />
        {/* Main Content Outlet*/}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

        {/* Right Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          <RightSidebar />
        </ResizablePanel>
        <AudioPlayer />
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
