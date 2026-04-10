package HuyLA.review.reaction;

import HuyLA.review.post.Post;
import HuyLA.review.post.PostRepository;
import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    public Reaction react(Long postId, ReactionType type, User user) {

        Post post = postRepository.findById(postId).orElseThrow();

        Optional<Reaction> existing =
                reactionRepository.findByUserIdAndPostId(user.getId(), postId);

        if (existing.isPresent()) {
            Reaction reaction = existing.get();
            reaction.setType(type);
            return reactionRepository.save(reaction);
        }

        Reaction reaction = Reaction.builder()
                .type(type)
                .user(user)
                .post(post)
                .build();

        return reactionRepository.save(reaction);
    }
}