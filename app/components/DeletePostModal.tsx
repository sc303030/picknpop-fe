import React from 'react';
import ModalLayout from './ModalLayout';
import {DeletePostModalProps} from '../types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import apiCall from "@/app/utils/api";

const DeletePostModal: React.FC<DeletePostModalProps> = ({ show, onClose, post }) => {
  const handleDeletePost = async () => {
    if (post) {
      try {
        const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/${post.id}`, {
          method: 'PATCH'
        });

        if (response.ok) {
          alert('게시글이 삭제되었습니다.');
          onClose();
          window.location.href = '/';
        } else {
          throw new Error('게시글 삭제 실패');
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
        <div className="relative bg-white p-6 pb-4 rounded-2xl shadow-md text-center w-[90%] sm:w-96">
            <div className="flex justify-center mb-4">
                <div className="bg-red-100 rounded-full p-4 w-14 h-14">
                    <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ff0000",}} className="text-2xl my-auto mx-auto" />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">게시글 삭제</h2>
                <p className="text-gray-600 mb-6">정말로 삭제하시겠습니까?</p>
            </div>
            <div className="flex justify-center space-x-2">
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl text-sm font-medium w-full hover:bg-gray-300"
                >
                    취소
                </button>
                <button
                    onClick={handleDeletePost}
                    className="bg-red-500 text-white px-4 py-2 rounded-2xl text-sm font-medium w-full hover:bg-red-600"
                >
                    삭제
                </button>
            </div>
        </div>
    </ModalLayout>
  );
};

export default DeletePostModal;
