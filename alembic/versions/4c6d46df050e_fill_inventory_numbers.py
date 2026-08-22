"""fill inventory numbers

Revision ID: 4c6d46df050e
Revises: 84578fbbc1de
Create Date: 2026-08-21 11:46:32.928088

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4c6d46df050e'
down_revision: Union[str, Sequence[str], None] = '84578fbbc1de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Fill inventory numbers for existing books."""
    op.execute("""
        UPDATE books
        SET inventory_number = LPAD(id::text, 5, '0')
    """)


def downgrade() -> None:
    """Remove inventory numbers."""
    op.execute("""
        UPDATE books
        SET inventory_number = NULL
    """)