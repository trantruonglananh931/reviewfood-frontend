package HuyLA.review.comment;

import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 📝 Tạo comment hoặc reply
    @PostMapping("/{postId}")
    public Comment create(
            @PathVariable Long postId,
            @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal User user
    ) {
        return commentService.createComment(
                postId,
                request.getContent(),
                user,
                request.getParentId()
        );
    }

    @PutMapping("/{id}")
    public Comment update(
            @PathVariable Long id,
            @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal User user
    ) {
        return commentService.updateComment(id, request.getContent(), user);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        commentService.deleteComment(id, user);
    }

    @GetMapping("/{postId}")
    public List<CommentResponse> get(@PathVariable Long postId) {
        return commentService.getCommentsTree(postId);
    }

    @GetMapping("/replies/{commentId}")
    public List<Comment> getReplies(@PathVariable Long commentId) {
        return commentService.getReplies(commentId);
    }
}