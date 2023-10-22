#include <stdio.h>
#include <unistd.h>

/**
 * get session id of current process
 */
int main()
{
    printf("sid: %d\n", getsid(0)); // 0 means current process
    return 0;
}