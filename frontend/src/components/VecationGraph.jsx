import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VecationGraph = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/GetAllVecations');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching vecation cards:', error);
      }
    };

    fetchCards();
  }, []);


  const chartData = {
    labels: cards.map(card => card.destination), 
    datasets: [
      {
        label: 'Number of Likes',
        data: cards.map(card => {
          const hearts = JSON.parse(localStorage.getItem('userLikes')) || {};
          return Object.values(hearts).filter(heart => heart[card.id]).length; 
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };


  const downloadExcel = () => {
    const excelData = cards.map(card => {
      const hearts = JSON.parse(localStorage.getItem('userLikes')) || {};
      const heartCount = Object.values(hearts).filter(heart => heart[card.id]).length;
      return {
        Destination: card.destination,
        'Number of Likes': heartCount,
      };
    });


    const ws = XLSX.utils.json_to_sheet(excelData);
    

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vecations_Likes_Graph');


    XLSX.writeFile(wb, 'Vecation_Likes_Graph.xlsx');
  };

  return (
    <div>
      <h1>Vecation Likes Graph</h1>
      <Button variant='outline-primary' onClick={()=>{navigate('/vecations')}}>go back to vecations</Button>
      <Button variant='outline-dark' onClick={downloadExcel} style={{ marginTop: '20px' }}>Download Excel</Button>
      <Bar data={chartData} />
    </div>
  );
};

export default VecationGraph;
