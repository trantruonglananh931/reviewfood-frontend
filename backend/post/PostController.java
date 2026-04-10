package HuyLA.review.post;

import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Post createPost(
            @RequestBody CreatePostRequest request,
            @AuthenticationPrincipal User user
    ) {
        return postService.createPost(request, user);
    }

    @GetMapping
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Post update(
            @PathVariable Long id,
            @RequestBody CreatePostRequest request
    ) {
        return postService.updatePost(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        postService.deletePost(id);
    }
}