import React from "react";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

function useApiData(url) {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  return { state };
}

export default function Quiz() {
  // Write your code here.

  const { state: data } = useApiData(QUIZ_API_BASE_URL);
  const [currPage, setCurrPage] = useState(0);
  const [pageWiseSelection, setPageWiseSelection] = useState({});
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  function onOptionSelect(pageNum, optionNum) {
    console.log(" pageNum = " + pageNum + " optionNum = " + optionNum);
    setPageWiseSelection({ ...pageWiseSelection, [pageNum]: optionNum });
  }

  // console.log(pageWiseSelection);

  const shouldBackBeDisabled = currPage == 0;
  const shouldNextBeDisabled =
    pageWiseSelection[currPage] === undefined || currPage === data.length - 1;

  const onNextClick = () => {
    setCurrPage((currPage) => currPage + 1);
  };
  const onBackClick = () => {
    setCurrPage((page) => (page - 1 >= 0 ? page - 1 : 0));
  };

  return (
    <>
      <Question
        data={data}
        pageNum={currPage}
        onOptionSelect={onOptionSelect}
        pageWiseSelection={pageWiseSelection}
      />
      <button disabled={shouldBackBeDisabled} onClick={onBackClick}>
        Back
      </button>
      <button disabled={shouldNextBeDisabled} onClick={onNextClick}>
        Next
      </button>
    </>
  );
}

const getCorrectIncorrectClass = (
  data,
  pageNum,
  pageWiseSelection,
  optionNum
) => {
  if (pageWiseSelection[pageNum] === undefined) {
    return "";
  }
  if (pageWiseSelection[pageNum] !== optionNum) {
    return "";
  }
  // page has some selection present which is same as curr optionNum
  if (data[pageNum].correctAnswer === pageWiseSelection[pageNum]) {
    return " correct";
  } else {
    return " incorrect";
  }
};

function Question({ data, pageNum = 0, onOptionSelect, pageWiseSelection }) {
  const heading = data[pageNum].question;
  const options = data[pageNum].answers || [];
  const onSelect = (idx) => {
    if (pageWiseSelection[pageNum] !== undefined) {
      return;
    }
    onOptionSelect(pageNum, idx);
  };
  return (
    <div>
      <h1>{heading}</h1>
      {options.map((option, idx) => {
        const addedClass = getCorrectIncorrectClass(
          data,
          pageNum,
          pageWiseSelection,
          idx
        );
        return (
          <h2
            key={option}
            className={`answer${addedClass}`}
            onClick={() => onSelect(idx)}
          >
            {option}
          </h2>
        );
      })}
    </div>
  );
}
