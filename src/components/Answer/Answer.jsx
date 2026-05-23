'use client'

import { useRef, useState } from 'react'
import styles from './Answer.module.scss'

const Answer = ({ handleAction }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')
    const areaRef = useRef(null)

    const changeStatus = () => {

        !isOpen ? setIsOpen(true) : setIsOpen(false)
    }

    const handleClick = (event) => {
        event.preventDefault()
        changeStatus()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
      await  handleAction(event)
        setText('')
    }

    return (

        <>

            {isOpen ? <form onSubmit={handleSubmit} className={styles.answerForm}>
                <textarea value={text} onChange={(e) => {
                    setText(e.target.value)
                }} autoFocus ref={areaRef} className={styles.textarea} name="comment_text" type="text" placeholder="leave a answer"></textarea>
                <div>
                    <button onClick={handleClick } type='click' className={styles.cancelAnswerButton}>cancel</button>
                    <button disabled={!text.trim()} type='submit' className={styles.sendAnswerButton}> send</button>

                </div>

            </form> : <button onClick={handleClick} className={styles.button}>Answer</button>}


        </>
    )
}

export default Answer