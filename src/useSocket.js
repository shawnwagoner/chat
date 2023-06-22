import {useEffect, useState, useRef} from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:8080";

const useSocketHook = () => {
    const [response, setResponse] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT);
        socketRef.current.on("chat message", data => {
            setResponse(prevState => [...prevState, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    },[]) 
    
    const sendMessage = (message) => {
        socketRef.current.emit("chat message", message);
    }

    return {response, sendMessage};
};


export default useSocketHook;