import Header from "./components/Header";
import Quiz from "./components/Quiz";
import questions from "./questions";


function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz questions={questions}/>
      </main>
    </>
  );
}

export default App;
