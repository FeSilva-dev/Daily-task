import {React, useState, useEffect, Fragment } from 'react'
import './style.css'
import { AiFillCloseCircle, AiOutlineCheck, AiOutlineClose} from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'

const Todo = () => {
    const openModal = () => {
        setModal(!modal)
    }

    const closeModal = () => {
        setModal(!modal)
    }

    // Aqui vai salvar a tarefa quando o usuario clicar no botao
    const saveTask = () => {
        // Pegando o valor que o usuario digitou no input usando js puro
        const task = document.getElementById('task').value
        
        setTasks([
            ...tasks, 
            {
                id: new Date().getTime(),
                task: task,
                done: false
            }
        ])

        setModal(false)
        window.localStorage.setItem('tasks', JSON.stringify([
            ...tasks, 
            {
                id: new Date().getTime(),
                task: task,
                done: false
            }
        ]))
    }

    const setDone = (id, opt) => {
        let newTask = tasks.filter((val) => {
            if(val.id == id){
                val.done = opt
            }
            return val
        })

        setTasks(newTask)
        window.localStorage.setItem('tasks', JSON.stringify(newTask))
    }

    const deleteTask = (id) => {
        let newTask = tasks.filter(val => {
            if(val.id != id){
                return val
            }
        })

        setTasks(newTask)
        window.localStorage.setItem('tasks', JSON.stringify(newTask))
    }

    const [tasks, setTasks] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if(window.localStorage.getItem('tasks') != undefined){
            setTasks(JSON.parse(window.localStorage.getItem('tasks')))
        }
    },[])

    return(
        <div className="app">
            {
                modal?
                <div className="modal">
                    <div className="modalContent">
                        <div className="close">
                            <AiFillCloseCircle onClick={() => closeModal()} size={38} color={'red'}/>
                        </div>
                        <h3>Adicionar nova tarefa</h3>
                        <input type="text" placeholder="Digite uma tarefa" id="task"/>
                        <button onClick={() => saveTask()}>Salvar</button>
                    </div>
                </div>
                :
                <div></div>
            }
            <div onClick={openModal} className="addTarefa">+</div>
            <div className="boxAnotacoes">
                <h2>Minhas tarefas diarias</h2>
                {
                    tasks.map((val) => {
                        if(!val.done){
                            return(
                                <div className="tarefaSingle">
                                    <p key={val.id} 
                                        onClick={() => setDone(val.id, true)} 
                                        className={!val.done ? 'unDone' : 'done'}>
                                        {val.task}
                                        <AiOutlineClose size={24}
                                            style={{
                                                position: 'relative',
                                                left: '5px',
                                                top: '6px'
                                            }}
                                        />
                                    </p>
                                    <BsFillTrashFill className="trash" 
                                        size={28}
                                        onClick={() => deleteTask(val.id)}
                                    />
                                </div>
                            )
                        }else{
                            return(
                                <div className="tarefaSingle">
                                    <p key={val.id} 
                                        onClick={() => setDone(val.id, false)} 
                                        className={!val.done ? 'unDone' : 'done'}>
                                        {val.task} 
                                        <AiOutlineCheck size={24}
                                            style={{
                                                position: 'relative',
                                                left: '5px',
                                                top: '6px'
                                            }}
                                        />
                                    </p>
                                    <BsFillTrashFill className="trash" 
                                        size={28}
                                        onClick={() => deleteTask(val.id)}
                                    />
                                </div>

                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Todo
