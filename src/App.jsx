import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  FileText,
  Lock,
  Upload,
  Trash2,
  Edit2,
  LogOut,
  X,
  Settings,
  LayoutGrid,
  Type,
  Menu,
  Award,
  BarChart3
} from 'lucide-react';

// --- UTILITY: SHUFFLE ARRAY ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- INITIAL DATA FROM CSV (ANAT 225) ---
const INITIAL_QUESTIONS = [
  {
    "id": "1",
    "text": "Which of the following is not a basic tissue?",
    "optionA": "Epithelial tissue",
    "optionB": "Cartilage tissue",
    "optionC": "Connective tissue",
    "optionD": "Nervous tissue",
    "correctAnswer": "optionB"
  },
  {
    "id": "2",
    "text": "What is the consequence of improper/incomplete dehydration in tissue dehydration?",
    "optionA": "Faster paraffin infiltration",
    "optionB": "Increased tissue transparency",
    "optionC": "Bubbles in tissue sections",
    "optionD": "Enhanced nuclear staining",
    "correctAnswer": "optionC"
  },
  {
    "id": "3",
    "text": "Which stage of tissue processing is alcohol removed?",
    "optionA": "Clearing",
    "optionB": "Dehydration",
    "optionC": "Fixation",
    "optionD": "Embedding",
    "correctAnswer": "optionA"
  },
  {
    "id": "4",
    "text": "What is the breakdown of tissue by enzymatic action?",
    "optionA": "Putrefaction",
    "optionB": "Autolysis",
    "optionC": "Necrosis",
    "optionD": "Fixation",
    "correctAnswer": "optionB"
  },
  {
    "id": "5",
    "text": "Which of the following stains is specifically used for the processing of nervous tissue?",
    "optionA": "Eosin",
    "optionB": "Haematoxylin",
    "optionC": "Van Gieson",
    "optionD": "Silver/Gold stains",
    "correctAnswer": "optionD"
  },
  {
    "id": "6",
    "text": "Which tissue process turns the tissue into a hard solid medium?",
    "optionA": "Fixation",
    "optionB": "Dehydration",
    "optionC": "Embedding",
    "optionD": "Staining",
    "correctAnswer": "optionC"
  },
  {
    "id": "7",
    "text": "Which of the following is not a feature of epithelial Cells?",
    "optionA": "Polarity",
    "optionB": "Possess basal and apical poles",
    "optionC": "Their apical poles exhibit microvilli",
    "optionD": "They have abundant blood vessels for direct nutrient supply",
    "correctAnswer": "optionD"
  },
  {
    "id": "8",
    "text": "Which of the following is not a key difference between microvilli and cilia?",
    "optionA": "Cilia increase surface area for absorption, microvilli do not",
    "optionB": "Cilia move, microvilli do not",
    "optionC": "Cilia are longer, microvilli are shorter",
    "optionD": "Cilia are fewer, microvilli are more numerous",
    "correctAnswer": "optionA"
  },
  {
    "id": "9",
    "text": "Blood, Bone and cartilage are classified under what tissue?",
    "optionA": "Epithelial tissue",
    "optionB": "Supportive connective tissue",
    "optionC": "Muscular tissue",
    "optionD": "Nervous tissue",
    "correctAnswer": "optionB"
  },
  {
    "id": "10",
    "text": "Which organ of the body is the transitional epithelium found?",
    "optionA": "Uterus",
    "optionB": "Ovaries",
    "optionC": "Urinary bladder",
    "optionD": "Vagina",
    "correctAnswer": "optionC"
  },
  {
    "id": "11",
    "text": "Which tract is the Pseudostratified epithelium commonly found?",
    "optionA": "Digestive tract",
    "optionB": "Respiratory tract",
    "optionC": "Reproductive tract",
    "optionD": "Urinary tract",
    "correctAnswer": "optionB"
  },
  {
    "id": "12",
    "text": "The destruction of which junction in the stomach lining causes Ulcers?",
    "optionA": "Gap junction",
    "optionB": "Adherens junction",
    "optionC": "Tight junctions",
    "optionD": "Desmosome",
    "correctAnswer": "optionC"
  },
  {
    "id": "13",
    "text": "What connects Muscles to bones in the human body?",
    "optionA": "Ligaments",
    "optionB": "Tendons",
    "optionC": "Cartilage",
    "optionD": "Fascia",
    "correctAnswer": "optionB"
  },
  {
    "id": "14",
    "text": "Which of the following are the abdominal muscles connected to each other?",
    "optionA": "Aponeuroses",
    "optionB": "Ligaments",
    "optionC": "Tendons",
    "optionD": "Fascia",
    "correctAnswer": "optionA"
  },
  {
    "id": "15",
    "text": "What connects bones to bones in the human body?",
    "optionA": "Tendons",
    "optionB": "Cartilage",
    "optionC": "Ligaments",
    "optionD": "Fascia",
    "correctAnswer": "optionC"
  },
  {
    "id": "16",
    "text": "Which Collagen are Fibrous connective tissue primarily made of?",
    "optionA": "Type III collagen",
    "optionB": "Type II collagen",
    "optionC": "Type IV collagen",
    "optionD": "Type I collagen",
    "correctAnswer": "optionD"
  },
  {
    "id": "17",
    "text": "Which of the following do Fibroblasts not synthesize?",
    "optionA": "Collagen",
    "optionB": "Ground substances",
    "optionC": "Myelin sheaths",
    "optionD": "Elastic fibres",
    "correctAnswer": "optionC"
  },
  {
    "id": "18",
    "text": "Which of the following best describes Ehlers-Danlos syndrome?",
    "optionA": "A genetic disorder affecting connective tissue causing flexible joints and fragile skin",
    "optionB": "An infectious disease affecting the lungs",
    "optionC": "A disorder that primarily affects the nervous system",
    "optionD": "A vitamin deficiency causing muscle weakness",
    "correctAnswer": "optionA"
  },
  {
    "id": "19",
    "text": "The pancreas is classified as a_________",
    "optionA": "Simple tubular gland",
    "optionB": "Compound acinar gland",
    "optionC": "Simple coiled gland",
    "optionD": "Compound tubuloalveolar gland",
    "correctAnswer": "optionB"
  },
  {
    "id": "20",
    "text": "Which of the following is not a type of cartilage?",
    "optionA": "Hyaline cartilage",
    "optionB": "Elastic Cartilage",
    "optionC": "Articular cartilage",
    "optionD": "Fibrocartilage",
    "correctAnswer": "optionC"
  },
  {
    "id": "21",
    "text": "Which of the following statements is not true?",
    "optionA": "The free surface of hyaline cartilage is covered by perichondrium",
    "optionB": "The free surface of Fibrocartilage is covered by perichondrium",
    "optionC": "Ground substances are complex molecules contains Proteins and Carbohydrates",
    "optionD": "The core protein in Proteoglycan is Aggrecan",
    "correctAnswer": "optionB"
  },
  {
    "id": "22",
    "text": "Which type of collagen does not form fibrils or bundles?",
    "optionA": "Type II collagen",
    "optionB": "Type I collagen",
    "optionC": "Type III collagen",
    "optionD": "Type IV collagen",
    "correctAnswer": "optionD"
  },
  {
    "id": "23",
    "text": "What molecule does reticular fibers contain more than type I fibers?",
    "optionA": "Elastin",
    "optionB": "DNA",
    "optionC": "Carbohydrates",
    "optionD": "Calcium",
    "correctAnswer": "optionC"
  },
  {
    "id": "24",
    "text": "Which of the following correctly describes the color of hyaline cartilage and fibrocartilage when stained with Hematoxylin and Eosin (H&E)?",
    "optionA": "Light yellow to pink for hyaline, pink to purple for fibrocartilage",
    "optionB": "Light purple to pink for hyaline, pink to red for fibrocartilage",
    "optionC": "Light orange to purple for hyaline, red to pink for fibrocartilage",
    "optionD": "Light blue to pink for hyaline, pink to yellow for fibrocartilage",
    "correctAnswer": "optionB"
  },
  {
    "id": "25",
    "text": "Which of the following is not an example of glycosaminoglycans (GAGS)?",
    "optionA": "Chondroitin sulphate",
    "optionB": "Heparin sulphate",
    "optionC": "Collagen",
    "optionD": "Keratin sulphate",
    "correctAnswer": "optionC"
  },
  {
    "id": "26",
    "text": "Blood Cell production occuring outside the bone marrow is called?",
    "optionA": "Intramedullary Hematopoiesis",
    "optionB": "Extramedullary Hematopoiesis",
    "optionC": "Myelopoiesis",
    "optionD": "Erythopoiesis",
    "correctAnswer": "optionB"
  },
  {
    "id": "27",
    "text": "Internal organs found in the chest, abdomen and pelvis are generally called?",
    "optionA": "Skeletal organs",
    "optionB": "Appendages",
    "optionC": "Viscera",
    "optionD": "Cutaneous structures",
    "correctAnswer": "optionC"
  },
  {
    "id": "28",
    "text": "________ breakdown bones, __________ builds bones, __________maintains bones respectively",
    "optionA": "Osteoclasts, Osteoblasts, Osteocytes",
    "optionB": "Osteoblasts, Osteocytes, Osteoclasts",
    "optionC": "Osteoblasts, Osteocytes, Osteoclasts",
    "optionD": "Osteoclasts, Osteocytes, Osteoblasts",
    "correctAnswer": "optionA"
  },
  {
    "id": "29",
    "text": "Which of the following are the special chemicals Osteocytes release to eat bones?",
    "optionA": "Osteocalcin and Alkaline phosphatase",
    "optionB": "Collagen and Hydroxyapatite",
    "optionC": "Calcitonin and PTH",
    "optionD": "Cathepsin K and Collagenase",
    "correctAnswer": "optionD"
  },
  {
    "id": "30",
    "text": "Which of the following contains two ways by which bone formation happens?",
    "optionA": "Bone remodeling and calcification",
    "optionB": "Intramembranous ossification and Endochondral ossification",
    "optionC": "Osteoblast activation and bone resorption",
    "optionD": "Appositional growth and interstitial growth",
    "correctAnswer": "optionB"
  },
  {
    "id": "31",
    "text": "Which of the following are formed by the fusion of many stem cells?",
    "optionA": "Osteocytes",
    "optionB": "Osteoblasts",
    "optionC": "Osteoclasts",
    "optionD": "Chondrocytes",
    "correctAnswer": "optionC"
  },
  {
    "id": "32",
    "text": "Which of the following is not a basic tissue?",
    "optionA": "Nervous tissue",
    "optionB": "Muscle tissue",
    "optionC": "Connective tissue",
    "optionD": "Cartilage",
    "correctAnswer": "optionD"
  },
  {
    "id": "33",
    "text": "Mitochondria in Muscles fibers Cells are called?",
    "optionA": "Sarcosome",
    "optionB": "Sarcoplasm",
    "optionC": "Sarcoplasm",
    "optionD": "Sarcoplasmic reticulum",
    "correctAnswer": "optionA"
  },
  {
    "id": "34",
    "text": "________ is the basic unit of a muscle",
    "optionA": "Myofibril",
    "optionB": "Sarcomere",
    "optionC": "Fascicle",
    "optionD": "Muscle fiber",
    "correctAnswer": "optionB"
  },
  {
    "id": "35",
    "text": "Muscle fiber is covered by_________",
    "optionA": "Endomysium",
    "optionB": "Perimysium",
    "optionC": "Epimysium",
    "optionD": "NOTA",
    "correctAnswer": "optionA"
  },
  {
    "id": "36",
    "text": "What is the name of the thin dark line found in the middle of the A band?",
    "optionA": "M line",
    "optionB": "L line",
    "optionC": "Z line",
    "optionD": "A line",
    "correctAnswer": "optionA"
  },
  {
    "id": "37",
    "text": "Which of the following pair of muscles are transverse striated?",
    "optionA": "Briceps branchi and iris muscle",
    "optionB": "Triceps brachii and Myocardial muscle",
    "optionC": "Trapezius and Cilliary muscle",
    "optionD": "Atrial muscle fiber and Destrusor muscle",
    "correctAnswer": "optionB"
  },
  {
    "id": "38",
    "text": "The thick and thin filaments in a striated muscle respectively are?",
    "optionA": "Myosin and actin",
    "optionB": "Actin and myosin",
    "optionC": "Collagen and Elastin",
    "optionD": "Troponin and Tropomyosin",
    "correctAnswer": "optionA"
  },
  {
    "id": "39",
    "text": "Which of the following is not a colloid found in the plasma?",
    "optionA": "Prothrombin",
    "optionB": "Hormones",
    "optionC": "Immunoglobulins",
    "optionD": "NOTA",
    "correctAnswer": "optionD"
  },
  {
    "id": "40",
    "text": "Which of the following is not a Ramanowsky-type staining technique?",
    "optionA": "Giemsa",
    "optionB": "Wright",
    "optionC": "Gram",
    "optionD": "Leishman",
    "correctAnswer": "optionC"
  },
  {
    "id": "41",
    "text": "Which of the following is not a type of immunoglobulins?",
    "optionA": "IgM",
    "optionB": "IgE",
    "optionC": "IgD",
    "optionD": "IgF",
    "correctAnswer": "optionD"
  },
  {
    "id": "42",
    "text": "Which of the following Blood cells do Myeloid stem cells not give rise to?",
    "optionA": "Red blood Cells",
    "optionB": "None of the above (NOTA)",
    "optionC": "Lymphocytes",
    "optionD": "White blood cells",
    "correctAnswer": "optionC"
  },
  {
    "id": "43",
    "text": "Which theory holds that all types of blood cells are deprived from a common stem cell?",
    "optionA": "Polyphyletic theory",
    "optionB": "Monophyletic theory",
    "optionC": "Dualistic theory",
    "optionD": "Pluripotent theory",
    "correctAnswer": "optionB"
  },
  {
    "id": "44",
    "text": "Which theory holds that all types of blood cells are deprived from multiple stem cells?",
    "optionA": "Monophyletic theory",
    "optionB": "Dualistic theory",
    "optionC": "Pluripotent theory",
    "optionD": "Polyphyletic theory",
    "correctAnswer": "optionD"
  },
  {
    "id": "45",
    "text": "_______ is a threadlike extension of a nerve cell, and consists of an axon and myelin sheet",
    "optionA": "Dendrite",
    "optionB": "Soma",
    "optionC": "Nerve fiber",
    "optionD": "Neurologia",
    "correctAnswer": "optionC"
  },
  {
    "id": "46",
    "text": "Which of the following refers to the junction between two neurons where nerve impulses are transmitted chemically?",
    "optionA": "Axon hillock",
    "optionB": "Dendrite",
    "optionC": "Synapse",
    "optionD": "Myelin sheath",
    "correctAnswer": "optionC"
  },
  {
    "id": "47",
    "text": "Which of the following is not a category of synapses?",
    "optionA": "Axo-dendritic",
    "optionB": "Axo-muscular",
    "optionC": "Axo-axonic",
    "optionD": "Dendro-dendritic",
    "correctAnswer": "optionB"
  },
  {
    "id": "48",
    "text": "Which of the following is not a Glial cell?",
    "optionA": "Erythrocytes",
    "optionB": "Astrocytes",
    "optionC": "Oligodendrocytes",
    "optionD": "Satellite cells",
    "correctAnswer": "optionA"
  },
  {
    "id": "49",
    "text": "What is the most common type of neuron found in the human body?",
    "optionA": "Sensory neurons",
    "optionB": "Motor neurons",
    "optionC": "None of the above",
    "optionD": "Association neurons",
    "correctAnswer": "optionD"
  },
  {
    "id": "50",
    "text": "Which of the following is NOT a connective tissue layer associated with nerves?",
    "optionA": "Perineurium",
    "optionB": "Epineurium",
    "optionC": "Endoneprium",
    "optionD": "Endoneurium",
    "correctAnswer": "optionC"
  }
];

export default function App() {
  // --- STATE WITH LOCAL STORAGE PERSISTENCE ---
  const [view, setView] = useState('welcome');

  // 1. Guest ID State (Random 4-Digit Number)
  const [guestId] = useState(() => {
    const saved = localStorage.getItem('cbt_guestId');
    if (saved) return saved;
    // Generate Random 4 digits (1000 - 9999)
    const newId = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem('cbt_guestId', newId);
    return newId;
  });

  // 2. Questions (Initialized with SHUFFLE)
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('cbt_questions');
    return saved ? JSON.parse(saved) : shuffleArray(INITIAL_QUESTIONS);
  });

  // 3. App Name
  const [appName, setAppName] = useState(() => {
    return localStorage.getItem('cbt_appName') || "DANIEL'S ANATOMY CBT APP";
  });

  // 4. Test Title (Updated Default)
  const [testTitle, setTestTitle] = useState(() => {
    return localStorage.getItem('cbt_testTitle') || "ANAT 225: GENERAL HISTOLOGY AND CYTOLOGY";
  });

  // 5. Duration
  const [testDuration, setTestDuration] = useState(() => {
    const saved = localStorage.getItem('cbt_duration');
    return saved ? parseInt(saved, 10) : 20;
  });

  // 6. Marks Per Question
  const [marksPerQuestion, setMarksPerQuestion] = useState(() => {
    const saved = localStorage.getItem('cbt_marks');
    return saved ? parseInt(saved, 10) : 2;
  });

  // 7. Student Results
  const [testResults, setTestResults] = useState(() => {
    const saved = localStorage.getItem('cbt_results');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Test Taking State ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Admin State ---
  const [adminPassInput, setAdminPassInput] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const fileInputRef = useRef(null);

  // --- STYLE CONSTANTS ---
  // Guest ID Style: Pale Blue Bg, Dark Blue Text, Pill Shape, Small Font
  const GUEST_ID_STYLE = "bg-blue-50 text-blue-800 border border-blue-100 text-[10px] font-bold px-3 py-1 rounded-full inline-block";

  // --- EFFECT: SAVE TO LOCAL STORAGE ---
  useEffect(() => { localStorage.setItem('cbt_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('cbt_appName', appName); }, [appName]);
  useEffect(() => { localStorage.setItem('cbt_testTitle', testTitle); }, [testTitle]);
  useEffect(() => { localStorage.setItem('cbt_duration', testDuration.toString()); }, [testDuration]);
  useEffect(() => { localStorage.setItem('cbt_marks', marksPerQuestion.toString()); }, [marksPerQuestion]);
  useEffect(() => { localStorage.setItem('cbt_results', JSON.stringify(testResults)); }, [testResults]);

  // --- Timer Logic ---
  useEffect(() => {
    if (view === 'test' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (view === 'test' && timeLeft === 0) {
      handleSubmit(); 
    }
  }, [view, timeLeft]);

  // --- Handlers ---
  const startTest = () => {
    if (questions.length === 0) {
      alert("No questions available! Please login as admin and add some.");
      return;
    }
    setAnswers({});
    setScore(0);
    setCurrentQIndex(0);
    setTimeLeft(testDuration * 60); 
    setView('test');
    setIsMobileMenuOpen(false);
  };

  const handleAnswerSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let rawScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        rawScore += 1;
      }
    });
    const finalScore = rawScore * marksPerQuestion;
    const totalPossible = questions.length * marksPerQuestion;
    const percentage = Math.round((finalScore / totalPossible) * 100);

    // Save Result with GUEST ID
    const newResult = {
      id: Date.now(),
      guestId: guestId, // Add Guest ID to result
      score: finalScore,
      total: totalPossible,
      percentage: percentage,
      date: new Date().toLocaleString()
    };
    setTestResults(prev => [newResult, ...prev]);
    setScore(finalScore);
    setView('result');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassInput === 'BrainyBlessing08148800047') {
      setView('admin');
      setAdminPassInput('');
    } else {
      alert("Incorrect Password");
    }
  };

  const handleDeleteQuestion = (id) => {
    if(window.confirm("Delete this question?")) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    setEditingQuestion(null);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const newQuestions = [];
      
      lines.forEach((line, idx) => {
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (parts.length >= 6 && idx > 0) {
           const clean = (str) => str?.replace(/^"|"$/g, '').trim() || '';
           let correctKey = clean(parts[5]).toLowerCase();
           
           if (correctKey === 'a' || correctKey.includes('option a')) correctKey = 'optionA';
           else if (correctKey === 'b' || correctKey.includes('option b')) correctKey = 'optionB';
           else if (correctKey === 'c' || correctKey.includes('option c')) correctKey = 'optionC';
           else if (correctKey === 'd' || correctKey.includes('option d')) correctKey = 'optionD';
           else correctKey = 'optionA';

           newQuestions.push({
             id: Date.now() + Math.random().toString(),
             text: clean(parts[0]),
             optionA: clean(parts[1]),
             optionB: clean(parts[2]),
             optionC: clean(parts[3]),
             optionD: clean(parts[4]),
             correctAnswer: correctKey
           });
        }
      });

      if (newQuestions.length > 0) {
        setQuestions(prev => [...prev, ...newQuestions]);
        alert(`Successfully added ${newQuestions.length} questions!`);
      } else {
        alert("Could not parse questions. Check CSV format.");
      }
    };
    reader.readAsText(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // --- Reset to Default (Admin Action) ---
  const handleResetDefaults = () => {
    if(window.confirm("Reset all settings and questions to default? This clears your changes.")) {
        localStorage.clear();
        window.location.reload(); 
    }
  };

  const handleClearResults = () => {
    if(window.confirm("Clear all student results?")) {
      setTestResults([]);
    }
  };

  // ---------------- RENDERING ----------------

  // 1. EDIT MODAL
  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Question</h3>
          <button onClick={() => setEditingQuestion(null)}><X className="w-6 h-6"/></button>
        </div>
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Question Text</label>
            <textarea 
              className="w-full border p-2 rounded" 
              value={editingQuestion.text}
              onChange={e => setEditingQuestion({...editingQuestion, text: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['optionA', 'optionB', 'optionC', 'optionD'].map(opt => (
              <div key={opt}>
                <label className="block text-xs font-bold uppercase mb-1">{opt}</label>
                <input 
                  className="w-full border p-2 rounded"
                  value={editingQuestion[opt]}
                  onChange={e => setEditingQuestion({...editingQuestion, [opt]: e.target.value})}
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Correct Answer</label>
            <select 
              className="w-full border p-2 rounded"
              value={editingQuestion.correctAnswer}
              onChange={e => setEditingQuestion({...editingQuestion, correctAnswer: e.target.value})}
            >
              <option value="optionA">Option A</option>
              <option value="optionB">Option B</option>
              <option value="optionC">Option C</option>
              <option value="optionD">Option D</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
        </form>
      </div>
    </div>
  );

  // 2. ADMIN VIEW
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900">
        {editingQuestion && renderEditModal()}
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <h1 className="text-xl md:text-2xl font-bold flex items-center">
              <Lock className="w-6 h-6 mr-2 text-blue-600"/> Admin Panel
            </h1>
            <div className="flex gap-2">
                <button 
                onClick={handleResetDefaults}
                className="flex items-center text-gray-500 font-bold hover:bg-gray-200 px-3 py-2 rounded text-sm"
                >
                Reset Defaults
                </button>
                <button 
                onClick={() => setView('welcome')}
                className="flex items-center text-red-600 font-bold hover:bg-red-50 px-3 py-2 rounded"
                >
                <LogOut className="w-5 h-5 mr-2"/> Exit
                </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
              <Settings className="w-5 h-5 mr-2"/> Test Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Type className="w-4 h-4 mr-1 text-gray-400"/> App Name
                </label>
                <input 
                  type="text" 
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
                <input 
                  type="text" 
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              {/* Duration Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-400"/> Duration (Minutes)
                </label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setTestDuration(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >-</button>
                  <span className="text-xl font-mono font-bold w-12 text-center">{testDuration}</span>
                  <button 
                    onClick={() => setTestDuration(prev => prev + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >+</button>
                </div>
              </div>

              {/* Marks Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Award className="w-4 h-4 mr-1 text-gray-400"/> Marks per Question
                </label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setMarksPerQuestion(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >-</button>
                  <span className="text-xl font-mono font-bold w-12 text-center">{marksPerQuestion}</span>
                  <button 
                    onClick={() => setMarksPerQuestion(prev => prev + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >+</button>
                </div>
              </div>

            </div>
          </div>

          {/* Student Results Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center text-gray-800">
                  <BarChart3 className="w-5 h-5 mr-2"/> Student Results
                </h2>
                <button 
                   onClick={handleClearResults}
                   className="text-red-500 text-sm font-bold hover:underline"
                >
                   Clear History
                </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 border-b">
                   <tr>
                     <th className="p-3">Guest ID</th>
                     <th className="p-3">Score</th>
                     <th className="p-3">Percentage</th>
                     <th className="p-3 text-right">Date/Time</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {testResults.length === 0 ? (
                     <tr>
                       <td colSpan="4" className="p-4 text-center text-gray-400 italic">No results yet.</td>
                     </tr>
                   ) : (
                     testResults.map((res) => (
                       <tr key={res.id} className="hover:bg-gray-50">
                         {/* ADMIN RESULT PANEL GUEST ID */}
                         <td className="p-3 font-bold text-blue-600">
                           GUEST ID: {res.guestId || 'N/A'}
                         </td>
                         <td className="p-3 font-bold">{res.score} / {res.total}</td>
                         <td className={`p-3 font-bold ${res.percentage >= 40 ? 'text-green-600' : 'text-red-600'}`}>
                           {res.percentage}%
                         </td>
                         <td className="p-3 text-right text-gray-500">{res.date}</td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
               <p className="text-xs text-gray-400 mt-2 italic">* Only shows results taken on this specific device.</p>
             </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="file" 
              accept=".csv" 
              ref={fileInputRef}
              onChange={handleCSVUpload}
              className="hidden" 
            />
            <div className="flex gap-2 w-full md:w-auto">
                <button 
                onClick={() => fileInputRef.current.click()}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                <Upload className="w-5 h-5 mr-2"/> Import CSV
                </button>
                <button 
                onClick={() => { if(window.confirm("Delete ALL questions?")) setQuestions([]); }}
                className="flex-1 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-bold"
                >
                <Trash2 className="w-5 h-5 mr-2"/> Clear All
                </button>
            </div>
            <div className="md:ml-auto font-bold text-gray-500">
              Total: {questions.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-gray-50 border-b">
                  <tr>
                  <th className="p-4 w-12">#</th>
                  <th className="p-4">Question</th>
                  <th className="p-4 w-32">Answer</th>
                  <th className="p-4 w-32 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y">
                {questions.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-400">{idx + 1}</td>
                    <td className="p-4 font-medium max-w-xs truncate">{q.text}</td>
                    <td className="p-4 uppercase text-green-700 font-bold">{q.correctAnswer.replace('option','')}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setEditingQuestion(q)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded mr-2"
                      >
                        <Edit2 className="w-4 h-4"/>
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
             }
  // 3. WELCOME SCREEN
  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
        {/* Added 'relative' to the container to position the Guest ID */}
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-blue-100 relative">
          
          {/* WELCOME SCREEN GUEST ID: Top Right */}
          <div className={`absolute top-4 right-4 ${GUEST_ID_STYLE}`}>
            GUEST ID: {guestId}
          </div>

          <div className="mb-6 flex justify-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 uppercase tracking-tight">{appName}</h1>
          <p className="text-gray-500 font-medium mb-6 uppercase text-xs md:text-sm">{testTitle}</p>
          
          <div className="text-left bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-8 space-y-2">
            <p className="flex items-center"><Clock className="w-4 h-4 mr-2"/> <strong>Time Limit:</strong> {testDuration} Minutes</p>
            <p className="flex items-center"><FileText className="w-4 h-4 mr-2"/> <strong>Questions:</strong> {questions.length}</p>
            <p className="flex items-center"><CheckCircle className="w-4 h-4 mr-2"/> <strong>Scoring:</strong> {marksPerQuestion} Marks / Question</p>
          </div>

          <button 
            onClick={startTest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center mb-6"
          >
            <Play className="w-5 h-5 mr-2" /> Start Test
          </button>

          <div className="border-t pt-6">
            <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Admin Access</p>
            <form onSubmit={handleAdminLogin} className="flex gap-2">
              <input 
                type="password"
                placeholder="Password"
                value={adminPassInput}
                onChange={(e) => setAdminPassInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm font-bold hover:bg-black">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 4. TEST SCREEN
  if (view === 'test') {
    const question = questions[currentQIndex];
    return (
      <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
        {/* Header - Optimized for Mobile */}
        <header className="bg-white shadow-sm px-3 md:px-6 py-3 flex justify-between items-center z-20 flex-shrink-0 w-full relative">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-600"/>
            </button>

            <div className="flex flex-col overflow-hidden min-w-0 items-start">
               <span className="text-[10px] md:text-xs text-blue-600 font-bold uppercase truncate tracking-wider">{appName}</span>
              <h1 className="font-bold text-gray-800 text-xs md:text-lg uppercase truncate">
                {testTitle}
              </h1>
              {/* TEST SCREEN GUEST ID: Top Left, Below Title */}
              <div className={`mt-1 ${GUEST_ID_STYLE}`}>
                GUEST ID: {guestId}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className={`font-mono font-bold text-sm md:text-xl ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-blue-600'} flex items-center`}>
              <Clock className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => {
                if(window.confirm("Are you sure you want to submit?")) handleSubmit();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold shadow-md transition text-xs md:text-base whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden relative">
            {isMobileMenuOpen && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <aside className={`
                absolute inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:shadow-none md:z-10 md:w-72
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-700 flex items-center text-sm md:text-base">
                        <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600"/> Navigator
                    </h2>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="md:hidden p-1 text-gray-500"
                    >
                      <X className="w-5 h-5"/>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, idx) => {
                            const isAnswered = !!answers[q.id];
                            const isCurrent = idx === currentQIndex;
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                      setCurrentQIndex(idx);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className={`
                                        h-8 w-8 md:h-10 md:w-10 rounded-lg text-xs md:text-sm font-bold transition flex items-center justify-center border
                                        ${isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 border-blue-600 z-10' : ''}
                                        ${isAnswered ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}
                                    `}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs font-medium space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600"><div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2"/> Answered</span>
                        <span className="font-bold">{Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600"><div className="w-2 h-2 md:w-3 md:h-3 bg-gray-300 rounded-full mr-2"/> Unanswered</span>
                        <span className="font-bold">{questions.length - Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="flex items-center text-blue-600"><div className="w-2 h-2 md:w-3 md:h-3 border-2 border-blue-600 rounded-full mr-2"/> Current</span>
                        <span className="font-bold">#{currentQIndex + 1}</span>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-8 w-full">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-10 min-h-[50vh]">
                        <div className="mb-4 md:mb-6 flex justify-between items-center">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                Question {currentQIndex + 1} of {questions.length}
                            </span>
                            <span className="md:hidden text-[10px] font-bold text-gray-400">
                                {Object.keys(answers).length}/{questions.length} Done
                            </span>
                        </div>

                        <h2 className="text-lg md:text-2xl font-medium text-gray-800 mb-6 md:mb-8 leading-relaxed break-words">
                            {question.text}
                        </h2>

                        <div className="space-y-3">
                            {['optionA', 'optionB', 'optionC', 'optionD'].map((optKey) => (
                                <button
                                    key={optKey}
                                onClick={() => handleAnswerSelect(question.id, optKey)}
                                className={`
                                    w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex items-start md:items-center group
                                    ${answers[question.id] === optKey 
                                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                    }
                                 `}
                                >
                                <div className={`
                                    w-5 h-5 md:w-6 md:h-6 rounded-full border-2 mr-3 md:mr-4 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0
                                    ${answers[question.id] === optKey ? 'border-blue-500' : 'border-gray-300'}
                                `}>
                                {answers[question.id] === optKey && <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500" />}
                                </div>
                                <span className="text-sm md:text-base text-gray-700 font-medium break-words">
                                    <span className="font-bold mr-2 uppercase text-xs md:text-sm">{optKey.replace('option', '')}.</span>
                                    {question[optKey]}
                                </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8 md:mt-10 pt-6 border-t border-gray-100">
                            <button 
                                disabled={currentQIndex === 0}
                                onClick={() => setCurrentQIndex(prev => prev - 1)}
                                className="flex items-center text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 font-medium text-sm md:text-base"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" /> Previous
                            </button>
                            
                            <button 
                                disabled={currentQIndex === questions.length - 1}
                                onClick={() => setCurrentQIndex(prev => prev + 1)}
                                className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:hover:text-blue-600 font-medium text-sm md:text-base"
                            >
                                Next <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </div>
    );
                                        }
                                    // 5. RESULT SCREEN
  if (view === 'result') {
    const totalPossibleScore = questions.length * marksPerQuestion;
    const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;
    const isPass = percentage >= 40;
    return (
      <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center">
            
            <div className="mb-6 border-b pb-4">
                <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest mb-1">{appName}</p>
                <h1 className="text-xl md:text-2xl font-bold text-blue-600 uppercase tracking-tight">
                  {testTitle}
                </h1>
            </div>

            <div className="mb-4 flex justify-center">
              {isPass ? <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500" /> : <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500" />}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Test Completed</h2>
            {/* RESULT SCREEN GUEST ID: Below Test Completed */}
            <div className={`mb-4 ${GUEST_ID_STYLE}`}>
               GUEST ID: {guestId}
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 mt-6">
               <div className="text-center bg-gray-50 p-4 rounded-xl w-full md:w-1/3">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Score</span>
                  <span className={`text-3xl font-extrabold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                      {score} / {totalPossibleScore}
                  </span>
               </div>
               <div className="text-center bg-gray-50 p-4 rounded-xl w-full md:w-1/3">
                 <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Percentage</span>
                  <span className={`text-3xl font-extrabold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                      {percentage}%
                  </span>
               </div>
            </div>
            <button 
              onClick={() => setView('welcome')}
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center mx-auto w-full md:w-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Back to Home
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                Detailed Test Review
             </div>
             <div className="divide-y divide-gray-100">
                {questions.map((q, idx) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correctAnswer;
                    const skipped = !userAns;
                    return (
                        <div key={q.id} className="p-4 md:p-6">
                            <div className="flex gap-3">
                                <span className="font-bold text-gray-400 text-sm md:text-base">{idx + 1}.</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 mb-3 text-sm md:text-base break-words">{q.text}</p>
                                     
                                    <div className="flex flex-col gap-2 text-xs md:text-sm">
                                        <div className={`flex items-start p-2 rounded ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                            <span className="font-bold w-20 md:w-24 flex-shrink-0 uppercase text-[10px] md:text-xs mt-0.5">Your Answer:</span>
                                            <span className="break-words">
                                                {skipped ? <span className="italic text-gray-500">Skipped</span> : 
                                                    <span><span className="font-bold uppercase mr-1">{userAns.replace('option','')}</span> {q[userAns]}</span>
                                                }
                                                {isCorrect && <CheckCircle className="inline w-3 h-3 md:w-4 md:h-4 ml-2"/>}
                                                {!isCorrect && !skipped && <XCircle className="inline w-3 h-3 md:w-4 md:h-4 ml-2"/>}
                                            </span>
                                        </div>

                                        {!isCorrect && (
                                            <div className="flex items-start p-2 rounded bg-green-50 text-green-800">
                                                <span className="font-bold w-20 md:w-24 flex-shrink-0 uppercase text-[10px] md:text-xs mt-0.5">Correct Answer:</span>
                                                <span className="break-words">
                                                    <span className="font-bold uppercase mr-1">{q.correctAnswer.replace('option','')}</span>
                                                    {q[q.correctAnswer]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
