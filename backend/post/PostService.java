package HuyLA.review.post;

import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(CreatePostRequest request, User user) {

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .createdAt(LocalDateTime.now())
                .author(user)
                .build();

        return postRepository.save(post);
    }

    public Post updatePost(Long id, CreatePostRequest request) {

        Post post = postRepository.findById(id).orElseThrow();

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}