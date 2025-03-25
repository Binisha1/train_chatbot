import CustomizationPanel from "@/components/customizationPanel";

const Customization = () => {
  return (
    <div className="flex flex-col justify-center  w-full p-4">
      <div className="max-w-7xl w-full mx-auto">
        {" "}
        <main className="flex flex-col gap-12 text-text-primary md:flex-row ">
          <div className="w-full md:w-1/2 p-4 overflow-y-auto">
            <h2 className="mb-6 text-2xl">Chatbot Customization</h2>
            <CustomizationPanel />
          </div>
          <div className="w-full md:w-1/2 p-4 bg-background">
            <h2 className="text-2xl mb-6">PlayGround</h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customization;
