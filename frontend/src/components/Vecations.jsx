import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Alert, Dropdown, Pagination } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Vecations.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { Toast } from 'react-bootstrap';



export const Vecations = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 
  const [price, setPrice] = useState('');
  const [imagePath, setImagePath] = useState(null); 
  const [editId, setEditId] = useState(null); 
  const [error, setError] = useState(''); 
  const [sortOption, setSortOption] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 4; 
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLikedOnly, setShowLikedOnly] = useState(false);




  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:3000/GetAllVecations');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching vecation cards:', error);
    }
  };

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('vecationCards'));
    if (storedCards) {
      setCards(storedCards);
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      setName(localStorage.getItem("user-fullName"));
      localStorage.getItem('user-id')
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('vecationCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    fetchCards();
    setShowToast(true)
    const timer = setTimeout(() => {setShowToast(false)}, 2000);
    return ()=> clearTimeout(timer)
  }, []);


  const sortCards = (option) => {
    let sortedCards = [...cards];
    if (option === 'priceLowToHigh') {
      sortedCards.sort((a, b) => a.price - b.price);
    } else if (option === 'priceHighToLow') {
      sortedCards.sort((a, b) => b.price - a.price);
    }
    return sortedCards;
  };


  const paginateCards = (cards) => {
    const sortedCards = sortOption ? sortCards(sortOption) : cards;
    const indexOfLastCard = currentPage * itemsPerPage;
    const indexOfFirstCard = indexOfLastCard - itemsPerPage;
    return sortedCards.slice(indexOfFirstCard, indexOfLastCard);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const validateForm = () => {
    if (!destination || !description || !startDate || !endDate) {
      setError('All fields are required.');
      return false;
    }

    if (price > 10000) {
      setError('Price cannot exceed 10,000.');
      return false;
    }

    if(price <= 0) {
      setError('Price must be positive number')
      return false;
    }

    if (!imagePath && !editId) { 
      setError('An image is required when creating a new vecation.');
      return false;
    }

    setError(''); 
    return true;
  };


  const handleSubmit = async (id) => {
    if (!validateForm()) {
      return; 
    }

    const formData = new FormData();
    formData.append('destination', destination);
    formData.append('description', description);


    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('price', price.toString());

    if (imagePath) {
      formData.append('imagePath', imagePath);
    } else if (editId && !imagePath) {
      formData.append('imagePath', cards.find(card => card.id === editId)?.imagePath || '');
    }

    try {
      const response = await fetch(
        id ? `http://localhost:3000/vecations/${id}` : 'http://localhost:3000/vecations',
        {
          method: id ? 'PATCH' : 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        await fetchCards(); 
        
        setDestination('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setPrice('');
        setImagePath(null);
        setEditId(null); 
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to submit data:', error);
    }
  };

    const handleDisconnect = () => {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('isAdmin');
      navigate('/login');
    }

    const handleDelete = (cardId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this Vecation?");
    if (confirmDelete) {
      deleteVecation(cardId); 
    }
    };


const deleteVecation = async (vecationId) => {
  try {
    const response = await fetch(`http://localhost:3000/vecations/${vecationId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Vecation deleted:', data);
      alert('Vecation deleted successfully');
      fetchCards(); 
    } else {
      const errorData = await response.json();
      console.error('Error deleting vecation:', errorData);
      alert('Failed to delete vecation');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the vecation');
  }
};


const handleUpdate = (card) => {
  setEditId(card.id);
  setDestination(card.destination);
  setDescription(card.description);


  const startDateFormatted = card.startDate ? convertToDateInputFormat(card.startDate) : '';
  const endDateFormatted = card.endDate ? convertToDateInputFormat(card.endDate) : '';

  setStartDate(startDateFormatted); 
  setEndDate(endDateFormatted);    

  setPrice(card.price);
  setImagePath(card.imagePath); 
  setShowModal(true); 
};



  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return ''; 


    const date = new Date(dateString);


    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');


    return `${year}-${month}-${day}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDestination('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setPrice('');
    setImagePath(null);
    setEditId(null); 
  };


  const handleImageChange = (event) => {
    if (event.target.files) {
      setImagePath(event.target.files[0]);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const paginatedCards = paginateCards(cards);


  const totalPages = Math.ceil(cards.length / itemsPerPage);


  const toggleHeart = async (cardId) => {
    const currentUser = localStorage.getItem('user-id');
    
    const hearts = JSON.parse(localStorage.getItem('userLikes')) || {};
    hearts[currentUser] = hearts[currentUser] || {};
  

    const isLiked = hearts[currentUser][cardId];
  
  
    const newHeartState = !isLiked;
    hearts[currentUser][cardId] = newHeartState;
    localStorage.setItem('userLikes', JSON.stringify(hearts));
  
 
    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId) {
        card.heartClicked = newHeartState;
      }
      return card;
    }));
  
    try {
      const response = await fetch('http://localhost:3000/like-vecation', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: currentUser, vecation_id: cardId }),
      });
  
      if (response.ok) {
        console.log(isLiked ? alert('Vecation unliked successfully') : 'Vecation liked successfully');
      } else {
        console.error(isLiked ? 'Failed to unlike vecation' : 'Failed to like vecation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const isHeartClicked = (cardId) => {
    const currentUser = localStorage.getItem('user-id');
    const hearts = JSON.parse(localStorage.getItem('userLikes')) || {};
    return hearts[currentUser]?.[cardId] || false; 
  };

  const countLikes = (cardId) => {
    const hearts = JSON.parse(localStorage.getItem('userLikes')) || {};
    return Object.values(hearts).filter(heart => heart[cardId]).length;
  };
  
  
  return (
    <div>
      <h2> Vecations </h2>
      <div id='name'>
        hello {name}
        <Button variant='danger' onClick={handleDisconnect}>disconnect</Button>
      </div>
      <div id='actionbtn'>
      {isAdmin && (
        <Button variant="outline-primary" onClick={() => navigate('/vecation-graph')}>View Vecations Graph</Button>
      )}
      {isAdmin && (
        <Button variant='outline-primary' onClick={() => setShowModal(true)}>Add New Vecation</Button>
      )}

      {!isAdmin && (
        <Button variant="outline-primary" onClick={() => setShowLikedOnly(!showLikedOnly)}>
        {showLikedOnly ? 'Show All Vecations' : 'Show My Liked Vecations'}
      </Button>
      )}
      </div>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort by Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortOption('priceLowToHigh')}>Price: Low to High</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption('priceHighToLow')}>Price: High to Low</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


      <div className="toast-container">
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong className="me-auto">Welcome</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body>Hello {name}!</Toast.Body>
      </Toast>
    </div>


      <div className="vecation-cards">
        {paginatedCards.filter(card => !showLikedOnly || isHeartClicked(card.id)).map((card) => (
          <Card key={card.id} style={{ width: '18rem' }}>
            {/* Display image */}
            {card.imagePath && (
              <img
                src={`http://localhost:3000/${card.imagePath}`}
                className="card-img-top img-custom"
                alt="Vecation"
              />
            )}
            <Card.Body>
              <Card.Title>{card.destination}</Card.Title>
              <div>
                <p>{card.description}</p>
                <p>
                  <small className="text-muted">Start Date: {convertToDateInputFormat(card.startDate)}</small>
                </p>
                <p>
                  <small className="text-muted">End Date: {convertToDateInputFormat(card.endDate)}</small>
                </p>
                <p>
                  <small className="text-muted">Price: {card.price}</small>
                </p>
                <p>
                  <small className="text-muted">Likes: {countLikes(card.id)}</small>
                </p>
              <div id='btns'>
              {isAdmin && (
                 <Button variant="warning" onClick={() => handleUpdate(card)}>
                 Update
               </Button>
              )}
              {isAdmin && (
                  <Button variant='danger' onClick={()=> handleDelete(card.id)}>Delete</Button>
              )}
                </div>
                  <div>
                  {!isAdmin && (
                      <span onClick={() => toggleHeart(card.id)}>
                      {isHeartClicked(card.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                    </span>
                  )}
                  </div>
                </div>
            </Card.Body>
          </Card>
        ))}
      </div>

     
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Vecation' : 'Add New Vecation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form>
            <Form.Group controlId="destination">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                min={today}
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                min={startDate} 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="imagePath">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              <span>when first uploaded no need to upload again</span>
              {imagePath && (
              <div>
                <strong>Current Image:</strong>
                <img
                  src={`http://localhost:3000/${imagePath}`}
                  alt="Current Vecation"
                  className="img-thumbnail"
                  style={{ width: '100px', height: 'auto' }}
                />
              </div>
            )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit(editId)}
          >
            {editId ? 'Update Vecation' : 'Add Vecation'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
