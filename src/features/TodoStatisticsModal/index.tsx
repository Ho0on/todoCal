import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { HiOutlineTrash } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoStatisticsModalOpenState, todoStatisticsState } from './atom';
import {
  filteredTodoListState,
  selectedDateState,
  todoListState,
} from '../TodoList/atom';

const ModalBody = styled.div`
  width: 100vw;
  max-width: 386px;
  padding: 8px;
`;

const Date = styled.small`
  display: block;
  color: #c9c8cc;
`;

const TodoActionButton = styled.button<{ secondary?: boolean }>`
  border: none;
  background-color: transparent;
  color: ${({ secondary }) => secondary && '#ff6b6b'};
  cursor: pointer;
`;

const TodoActions = styled.span`
  flex: 1 0 5%;
`;

const Content = styled.span`
  flex: 1 0 95%;
`;

const TodoItem = styled.li`
  width: 100%;
  display: flex;
  color: #c9c8cc;
  align-items: center;
  border-radius: 8px;
`;

const TodoList = styled.p`
  list-style: circle;
  margin: 0;
  padding: 0;
  width: 100%;
  ${TodoItem} + ${TodoItem} {
    margin-top: 8px;
  }
`;

const Statistics = styled.div`
  color: #7047eb;
  font-size: 16px;
  font-weight: bold;
`;

const Card = styled.div`
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
  background-color: #19181a;
  ${Date} + ${TodoList} {
    margin-top: 24px;
  } ;
`;

const TodoStatisticsModal = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isOpen, setIsOpen] = useRecoilState(todoStatisticsModalOpenState);

  const selectedDate = useRecoilValue(selectedDateState);

  const filteredTodoList = useRecoilValue(filteredTodoListState(selectedDate));
  const statistics = useRecoilValue(todoStatisticsState(selectedDate));

  const handleClose = () => {
    setIsOpen(false);
  };

  const removeTodo = (id: string) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalBody>
        <Card>
          <Date>2021-09-12</Date>
          <Statistics>
            할 일 {statistics.total - statistics.done}개 남음
          </Statistics>
          <TodoList>
            {filteredTodoList?.map(todo => {
              return (
                <TodoItem>
                  <Content>{todo.content}</Content>
                  <TodoActions></TodoActions>
                  <TodoActionButton
                    secondary
                    onClick={() => removeTodo(todo.id)}
                  >
                    <HiOutlineTrash />
                  </TodoActionButton>
                </TodoItem>
              );
            })}
          </TodoList>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default TodoStatisticsModal;
