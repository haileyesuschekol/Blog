import Image from "./Image"

const Comment = ({ comment }) => {
  return (
    <div className="p-4 bg-slate-200 rounded-xl mb-4">
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">{comment.user.name}</span>
        <span className="text-sm text-gray-500">{comment.createdAt}</span>
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  )
}

export default Comment
