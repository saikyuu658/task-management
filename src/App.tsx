import Sidebar from './components/sidebar';
import Lists from './components/listsTask';
import Title from './components/titleTask';
import { useEffect, useState } from 'react';
import ModalLogin from './components/Login';


function App() {

  const [sideControll, setSideControll] = useState(false);

  useEffect(() => {
      function handleResize() {
          if (window.innerWidth <= 740) {
              setSideControll(true);
          } else {
              setSideControll(false);
          }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, [setSideControll]);



  return (
    <>
      <div className="flex min-h-screen">
        <div className={sideControll? "fixed z-50": ""}>
          <Sidebar />
        </div>
        <main className="flex-1 bg-gray-900 text-white p-4">
          <Title />
          <Lists />
          <div className="relative bottom-[-50px] w-full flex justify-center z-10">
              <button
                  onClick={() => {  }}
                  className="bg-blue-600 text-white border-none rounded-full px-12 py-1 text-xl shadow-lg cursor-pointer flex items-center justify-center"
                  aria-label="Add Task"
              >
                  <p>Nova Task</p>
                  <p className="ml-2 text-sm opacity-70">
                      shift + '+'
                  </p>
              </button>
          </div>
        </main>
      </div>
      <ModalLogin />
    </>
  );
}

export default App;
