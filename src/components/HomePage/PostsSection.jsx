import React from 'react';
import './CSS/HomePage.css';
import { useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
const PostsSection = ({ posts, formatDate}) =>{
    const token = localStorage.getItem("token");
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const handleClose = () =>{
        setShow(false); 
    }
    const handleClickDelete = (id) =>{
        setDeleteId(id);
        setShow(true);
        
    }
    const handleDeletePost = async () =>{
        try {
            const url = `https://localhost:7118/api/Product/DeleteProduct/${deleteId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Помилка: ${response.status}`);
            }
    
            console.log("Оголошення видалено");
            window.location.reload();
        } catch (error) {
            console.error("Помилка видалення:", error);
        }
        setShow(false);
    }
  return (
    <div className="posts">
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Видалити пост</Modal.Title>
            </Modal.Header>
            <Modal.Body>Впевнені що хочите видалити пост?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрити
            </Button>
            <Button variant="primary" onClick={handleDeletePost}>
                Видалити
            </Button>
            </Modal.Footer>
        </Modal>
            {posts.map((post) => (
                <div className="post-card" key={post.id}>
                    <img src={post.img} alt={post.title} />
                    <h2>{post.title}</h2>
                    <h3>Опубліковано {formatDate(post.dateOfPublish)}</h3>
                    <div className="post-div">
                        <p>{post.price} грн</p>
                        <button className="delete-Btn" onClick={() => handleClickDelete(post.id)}>Видалити</button>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default PostsSection;