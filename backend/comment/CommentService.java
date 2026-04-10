package HuyLA.review.comment;

import HuyLA.review.post.Post;
import HuyLA.review.post.PostRepository;
import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public Comment createComment(Long postId, String content, User user, Long parentId) {

        Post post = postRepository.findById(postId).orElseThrow();

        Comment parent = null;
        if (parentId != null) {
            parent = commentRepository.findById(parentId).orElseThrow();
        }

        Comment comment = Comment.builder()
                .content(content)
                .post(post)
                .user(user)
                .parent(parent)
                .createdAt(LocalDateTime.now())
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public List<Comment> getRootComments(Long postId) {
        return commentRepository.findByPostIdAndParentIsNull(postId);
    }

    public List<Comment> getReplies(Long commentId) {
        return commentRepository.findByParentId(commentId);
    }

    public List<CommentResponse> getCommentsTree(Long postId) {

        List<Comment> all = commentRepository.findByPostId(postId);

        // group theo parentId
        Map<Long, List<Comment>> map = all.stream()
                .collect(Collectors.groupingBy(c ->
                        c.getParent() == null ? 0L : c.getParent().getId()
                ));

        // root = parent null (key = 0)
        return map.getOrDefault(0L, List.of())
                .stream()
                .map(c -> buildTree(c, map, 1))
                .toList();
    }

    private CommentResponse buildTree(Comment comment,
                                      Map<Long, List<Comment>> map,
                                      int depth) {

        List<CommentResponse> replies = new ArrayList<>();

        if (depth < 3) {
            List<Comment> children = map.getOrDefault(comment.getId(), List.of());

            replies = children.stream()
                    .map(c -> buildTree(c, map, depth + 1))
                    .toList();
        }

        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .username(comment.getUser().getUsername())
                .createdAt(comment.getCreatedAt())
                .replies(replies)
                .build();
    }

    public Comment updateComment(Long id, String content, User user) {

        Comment comment = commentRepository.findById(id).orElseThrow();

        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot edit this comment");
        }

        comment.setContent(content);

        return commentRepository.save(comment);
    }

    public void deleteComment(Long id, User user) {

        Comment comment = commentRepository.findById(id).orElseThrow();

        boolean isOwner = comment.getUser().getId().equals(user.getId());
        boolean isAdmin = user.getRole().name().equals("ADMIN");

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("You cannot delete this comment");
        }

        commentRepository.delete(comment);
    }
}
