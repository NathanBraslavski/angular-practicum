import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'writter',
  templateUrl: './writter.component.html',
  styleUrls: ['./writter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WritterComponent implements OnInit {
  @Input() parentId: number;
  @Output() done = new EventEmitter<boolean>();

  comment: string;

  constructor(
    private readonly commentsService: CommentsService,
  ) {
  }

  ngOnInit(): void {
  }

  addComment(): void {
    if (!isNaN(this.parentId))
      this.replyComment();
    else
      this.newComment();

    this.comment = '';
    this.done.next();
  }

  private replyComment(): void {
    this.commentsService.reply({
      id: (Math.random() * 100),
      comment: this.comment,
      parentId: this.parentId,
      user: {
        email: '',
        name: 'you'
      },
      timestamp: Date.now(),
    }, this.parentId);
  }

  private newComment(): void {
    this.commentsService.addComment({
      id: (Math.random() * 100),
      comment: this.comment,
      user: {
        email: '',
        name: 'you'
      },
      timestamp: Date.now(),
    });
  }
}
