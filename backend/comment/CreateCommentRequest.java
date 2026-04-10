package HuyLA.review.comment;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private String content;
    private Long parentId;
}