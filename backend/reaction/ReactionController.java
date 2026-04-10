package HuyLA.review.reaction;

import HuyLA.review.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reactions")
@RequiredArgsConstructor
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping("/{postId}")
    public Reaction react(
            @PathVariable Long postId,
            @RequestParam ReactionType type,
            @AuthenticationPrincipal User user
    ) {
        return reactionService.react(postId, type, user);
    }
}