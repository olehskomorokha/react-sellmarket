import React from 'react';

const CreatPoster = () => {
    return (
        <div>
            <h1>Create Poster</h1>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreatPoster;