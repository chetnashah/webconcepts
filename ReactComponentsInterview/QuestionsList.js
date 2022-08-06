import React from 'react';

const QUESTIONS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/questions';
const SUBMISSIONS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/submissions';

function useFetch(url) {
   // Write your code here.
    const [state, setState] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   let isMounted = false;
    useEffect(() => {
     console.log('fetching!');
     isMounted = true;
      
      setLoading(true);
      setState(null);
      setError(null);
      fetch(url)
       .then((resp) => resp.json())
       .then((json) => {
         if(isMounted) {
           setState(json);
           setLoading(false);
           setError(null);
         }
       })
       .catch((err) => {
         console.log(err);
         if(isMounted) {
           setState(null);
           setLoading(false);
           setError(err);
         }
       });
      // effect cleanup
      return () => {
        isMounted = false;
      };
   }, [url]);
 
  
    return {
      responseJSON: state,
      isLoading: isLoading,
      error: error,
    };
 
 }

export default function QuestionList() {
  // Write your code here.

  const {responseJSON: questionsJSON, isLoading: isLoadingQ, error: errQ} = useFetch(QUESTIONS_API_BASE_URL);
  const {responseJSON: submissionsJSON, isLoading: isLoadingS, error: errS} = useFetch(SUBMISSIONS_API_BASE_URL);


  if(isLoadingQ || isLoadingS) {
    return <div>Loading...</div>;
  }
  // indexed by id
  const categories = {
    
  };
  // indexed by id
  const questions = {
    
  };

  questionsJSON.forEach(q => {
    if(!categories[q.category]) {
      categories[q.category] = [];
    }
    categories[q.category].push(q);
    questions[q.id] = q;
  });

  submissionsJSON.forEach(submission => {
    questions[submission.questionId].status = submission.status;
  });

  return (
    <>
      {Object.keys(categories).map(cat => (
        <Category 
          heading={cat} 
          total={categories[cat].length} 
          solved={getSolvedQuestionsInCategory(categories,questions,cat)} 
          questions={categories[cat]}/>
        )
      )}
    </>
  );
}

function getSolvedQuestionsInCategory(categories, questions, cat) {
  let qs = categories[cat];
  let cnt = 0;
  for(let i=0;i<qs.length;i++) {
    let qId = qs[i].id;
    if(questions[qId].status === "CORRECT") {
      cnt++;
    }
  }
  return cnt;
}

function Category({ heading, total, solved, questions}) {
  return <div className={"category"}>
    <h2>{`${heading} - ${solved} / ${total}`}</h2>
    {questions && questions.map(q => 
      <Question qText={q.name} status={q.status} questionId={q.id}/>
    )}
  </div>
}

function getStatusClass(status) {
  const lowercasestatus = (status || "").toLowerCase();
  return lowercasestatus.replace("_","-");
}

function Question({ questionId, qText, status }) {
  const statusClass = getStatusClass(status) || "unattempted";
  const classList = `status ${statusClass}`;
  return (
    <div className="question">
      <div className={classList}></div>
      <h3>{qText}</h3>
    </div>
  );
}