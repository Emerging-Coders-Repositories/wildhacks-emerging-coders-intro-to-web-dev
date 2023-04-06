import React from "react";

const List = ({ data }) => {

    console.log(data); 
    return (

        <div className="list-of-words">
            {data.length === 0 ? <div><p>Waiting for Query...</p></div>
            :
            <ul>{data.map(word => 
                <li key={word.word}>{word.word}</li>)}
                </ul>
}   
        </div>
    )
}

export default List; 