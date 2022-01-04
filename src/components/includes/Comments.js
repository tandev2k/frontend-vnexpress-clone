import React, { Fragment, useState, useEffect } from 'react'
import NoAvatar from '../../assets/images/user-icon.png'
import { ReplyForm } from './ReplyForm'

export const Comments = (props) => {
  const { comments, user, type, emitAddSubCommentEvent } = props
  const [allComment, setAllComment] = useState(comments.reverse())
  useEffect(() => {
    setAllComment([...comments].reverse())
  }, [comments])

  const addSubCommentHandler = (reply) => {
    // console.log(reply)
    // console.log(allComment)
    let cloneComments = [...allComment]
    const comment = cloneComments.find((comment) => comment._id === reply._id)
    comment.subComments.push(reply)
    emitAddSubCommentEvent(reply, type)
    setAllComment(cloneComments)
  }
  console.log(comments)
  console.log(allComment)
  return (
    <Fragment>
      {allComment &&
        allComment.map((comment) => {
          return (
            <div
              className="media comment"
              key={comment._id}
              style={
                comment.position && { borderColor: comment.position.color }
              }
            >
              <div className="media-left">
                <a href="#">
                  <img
                    alt="64x64"
                    className="media-object comment"
                    src={
                      comment.userId.avatar ? comment.userId.avatar : NoAvatar
                    }
                    data-holder-rendered="true"
                  />
                </a>
              </div>
              <div className="media-body">
                <h2 className="media-heading">
                  <a href="#">{comment.userId && comment.userId.name}</a>
                </h2>
                {comment.content}
                <div className="entity_vote">
                  <a href="#">
                    <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <span className="reply_ic">Phản hồi </span>
                  </a>
                </div>
                <ReplyForm
                  type={type}
                  user={user}
                  comment={comment}
                  addSubComment={addSubCommentHandler}
                />
                {comment.subComments &&
                  comment.subComments.reverse().map((reply) => {
                    return (
                      <div className="media sub-comment" key={reply._id}>
                        <div className="media-left">
                          <a href="#">
                            <img
                              alt="64x64"
                              className="media-object comment"
                              src={
                                reply.userId.avatar
                                  ? reply.userId.avatar
                                  : NoAvatar
                              }
                              data-holder-rendered="true"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h3 className="media-heading">
                            <a href="#">{reply.userId.name}</a>
                          </h3>
                          {reply.content}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
    </Fragment>
  )
}
