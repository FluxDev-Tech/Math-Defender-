// Comprehensive Question Database for College Math Topics
const questionDatabase = {
    statistics: [
        {
            type: 'multiple',
            question: 'What is the measure of central tendency that represents the middle value when data is ordered?',
            options: ['Mean', 'Median', 'Mode', 'Range'],
            correct: 1,
            explanation: 'The median is the middle value in an ordered dataset. If there are two middle values, the median is their average.'
        },
        {
            type: 'trueFalse',
            question: 'The standard deviation can never be negative.',
            correct: true,
            explanation: 'Standard deviation measures spread and is calculated as the square root of variance, which means it\'s always non-negative.'
        },
        {
            type: 'fillBlank',
            question: 'In a normal distribution, approximately 68% of data falls within ___ standard deviation(s) of the mean.',
            correct: ['1', 'one', '1 standard deviation'],
            explanation: 'This is part of the empirical rule (68-95-99.7 rule) for normal distributions.'
        },
        {
            type: 'multiple',
            question: 'What is the probability of getting heads when flipping a fair coin?',
            options: ['0.25', '0.5', '0.75', '1.0'],
            correct: 1,
            explanation: 'A fair coin has two equally likely outcomes, so P(heads) = 1/2 = 0.5'
        },
        {
            type: 'trueFalse',
            question: 'Correlation always implies causation.',
            correct: false,
            explanation: 'Correlation only shows a relationship between variables. Causation requires additional evidence showing one variable directly causes changes in another.'
        },
        {
            type: 'fillBlank',
            question: 'The sum of all probabilities in a probability distribution must equal ___.',
            correct: ['1', 'one', '100%'],
            explanation: 'The total probability of all possible outcomes must equal 1 (or 100%).'
        },
        {
            type: 'multiple',
            question: 'Which measure of central tendency is most affected by outliers?',
            options: ['Median', 'Mode', 'Mean', 'None of these'],
            correct: 2,
            explanation: 'The mean is calculated using all values, so extreme values (outliers) can significantly affect it. The median is more resistant to outliers.'
        },
        {
            type: 'trueFalse',
            question: 'A p-value less than 0.05 typically indicates statistical significance at the 5% level.',
            correct: true,
            explanation: 'A p-value < 0.05 means there\'s less than a 5% probability of observing the results by chance, which is commonly used as the threshold for statistical significance.'
        },
        {
            type: 'fillBlank',
            question: 'The variance is the square of the standard ___.',
            correct: ['deviation'],
            explanation: 'Variance = (Standard Deviation)². Standard deviation is the square root of variance.'
        },
        {
            type: 'multiple',
            question: 'What type of distribution has two distinct peaks?',
            options: ['Uniform', 'Bimodal', 'Normal', 'Skewed'],
            correct: 1,
            explanation: 'A bimodal distribution has two modes or peaks, indicating two different groups or categories in the data.'
        },
        {
            type: 'multiple',
            question: 'In hypothesis testing, what is a Type I error?',
            options: ['Accepting a false null hypothesis', 'Rejecting a true null hypothesis', 'Failing to reject a false null hypothesis', 'Correctly rejecting the null'],
            correct: 1,
            explanation: 'Type I error occurs when we reject a true null hypothesis (false positive). The probability of this is denoted by α (alpha).'
        },
        {
            type: 'trueFalse',
            question: 'The interquartile range (IQR) is calculated as Q3 - Q1.',
            correct: true,
            explanation: 'IQR = Q3 - Q1, where Q3 is the third quartile and Q1 is the first quartile. It represents the middle 50% of the data.'
        }
    ],

    algebra: [
        {
            type: 'multiple',
            question: 'Solve for x: 2x + 5 = 13',
            options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
            correct: 1,
            explanation: '2x + 5 = 13 → 2x = 8 → x = 4'
        },
        {
            type: 'trueFalse',
            question: 'The equation x² = 9 has only one solution.',
            correct: false,
            explanation: 'x² = 9 has two solutions: x = 3 and x = -3, since both 3² and (-3)² equal 9.'
        },
        {
            type: 'fillBlank',
            question: 'The slope-intercept form of a line is y = mx + ___.',
            correct: ['b'],
            explanation: 'In y = mx + b, m is the slope and b is the y-intercept.'
        },
        {
            type: 'multiple',
            question: 'What is the value of x in: 3x - 7 = 14?',
            options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
            correct: 2,
            explanation: '3x - 7 = 14 → 3x = 21 → x = 7'
        },
        {
            type: 'trueFalse',
            question: 'A quadratic equation can have at most two real solutions.',
            correct: true,
            explanation: 'A quadratic equation (degree 2) can have 0, 1, or 2 real solutions based on its discriminant (b² - 4ac).'
        },
        {
            type: 'fillBlank',
            question: 'In the equation ax² + bx + c = 0, the term "a" is called the ___ coefficient.',
            correct: ['quadratic', 'leading'],
            explanation: 'The coefficient "a" multiplies x² and is called the quadratic or leading coefficient.'
        },
        {
            type: 'multiple',
            question: 'Factor: x² - 9',
            options: ['(x-3)(x-3)', '(x+3)(x+3)', '(x-3)(x+3)', '(x-9)(x+1)'],
            correct: 2,
            explanation: 'x² - 9 is a difference of squares: a² - b² = (a-b)(a+b), so x² - 9 = (x-3)(x+3)'
        },
        {
            type: 'trueFalse',
            question: 'The graph of y = x² is a parabola that opens upward.',
            correct: true,
            explanation: 'When the coefficient of x² is positive, the parabola opens upward. When negative, it opens downward.'
        },
        {
            type: 'fillBlank',
            question: 'The point where a line crosses the y-axis is called the y-___.',
            correct: ['intercept'],
            explanation: 'The y-intercept is where x = 0, giving the point (0, b) in the equation y = mx + b.'
        },
        {
            type: 'multiple',
            question: 'If f(x) = 2x + 3, what is f(5)?',
            options: ['10', '11', '12', '13'],
            correct: 3,
            explanation: 'f(5) = 2(5) + 3 = 10 + 3 = 13'
        },
        {
            type: 'multiple',
            question: 'What is the discriminant of the quadratic equation 2x² - 3x + 1 = 0?',
            options: ['1', '5', '9', '17'],
            correct: 0,
            explanation: 'Discriminant = b² - 4ac = (-3)² - 4(2)(1) = 9 - 8 = 1'
        },
        {
            type: 'trueFalse',
            question: 'The expression (a + b)² equals a² + b².',
            correct: false,
            explanation: '(a + b)² = a² + 2ab + b², not a² + b². The middle term 2ab is essential.'
        }
    ],

    calculus: [
        {
            type: 'multiple',
            question: 'What is the derivative of x²?',
            options: ['x', '2x', 'x²', '2x²'],
            correct: 1,
            explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x²) = 2x²⁻¹ = 2x'
        },
        {
            type: 'trueFalse',
            question: 'The derivative represents the instantaneous rate of change.',
            correct: true,
            explanation: 'The derivative measures how a function changes at a specific point, representing the instantaneous rate of change or slope of the tangent line.'
        },
        {
            type: 'fillBlank',
            question: 'The integral is the ___ operation of differentiation.',
            correct: ['inverse', 'opposite', 'reverse'],
            explanation: 'Integration and differentiation are inverse operations. The integral "undoes" differentiation.'
        },
        {
            type: 'multiple',
            question: 'What is the derivative of a constant c?',
            options: ['0', '1', 'c', 'Undefined'],
            correct: 0,
            explanation: 'The derivative of any constant is 0 because constants don\'t change.'
        },
        {
            type: 'trueFalse',
            question: 'The second derivative provides information about the concavity of a function.',
            correct: true,
            explanation: 'If f\'\'(x) > 0, the function is concave up. If f\'\'(x) < 0, it\'s concave down. This helps identify inflection points.'
        },
        {
            type: 'fillBlank',
            question: 'A critical point occurs where the first derivative equals ___.',
            correct: ['0', 'zero'],
            explanation: 'Critical points occur where f\'(x) = 0 or where f\'(x) is undefined. These are potential maxima, minima, or saddle points.'
        },
        {
            type: 'multiple',
            question: 'What is ∫x dx?',
            options: ['x', 'x²', 'x²/2 + C', 'x/2 + C'],
            correct: 2,
            explanation: 'Using the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, so ∫x dx = x²/2 + C'
        },
        {
            type: 'trueFalse',
            question: 'The power rule for derivatives states: d/dx(xⁿ) = nxⁿ⁻¹',
            correct: true,
            explanation: 'This is one of the most fundamental differentiation rules, applicable for any real number n.'
        },
        {
            type: 'fillBlank',
            question: 'The limit of a function as x approaches infinity is called a ___ limit.',
            correct: ['infinite', 'infinity'],
            explanation: 'When we evaluate lim(x→∞) f(x), we\'re finding an infinite limit or limit at infinity.'
        },
        {
            type: 'multiple',
            question: 'What is the derivative of sin(x)?',
            options: ['-cos(x)', 'cos(x)', '-sin(x)', 'tan(x)'],
            correct: 1,
            explanation: 'd/dx[sin(x)] = cos(x). This is one of the basic trigonometric derivative rules.'
        },
        {
            type: 'multiple',
            question: 'What is the derivative of eˣ?',
            options: ['eˣ⁻¹', 'xeˣ⁻¹', 'eˣ', 'ln(x)'],
            correct: 2,
            explanation: 'The exponential function eˣ is unique in that its derivative is itself: d/dx(eˣ) = eˣ'
        },
        {
            type: 'trueFalse',
            question: 'The Mean Value Theorem requires the function to be continuous on [a,b] and differentiable on (a,b).',
            correct: true,
            explanation: 'MVT states that if f is continuous on [a,b] and differentiable on (a,b), then there exists c in (a,b) where f\'(c) = [f(b)-f(a)]/(b-a).'
        }
    ],

    geometry: [
        {
            type: 'multiple',
            question: 'What is the sum of interior angles in a triangle?',
            options: ['90°', '180°', '270°', '360°'],
            correct: 1,
            explanation: 'The sum of interior angles in any triangle is always 180°.'
        },
        {
            type: 'trueFalse',
            question: 'All squares are rectangles.',
            correct: true,
            explanation: 'A square is a special rectangle with all sides equal. All squares have four right angles, making them rectangles.'
        },
        {
            type: 'fillBlank',
            question: 'The circumference of a circle is C = 2πr, where r is the ___.',
            correct: ['radius'],
            explanation: 'The radius is the distance from the center to any point on the circle.'
        },
        {
            type: 'multiple',
            question: 'What is the area of a circle with radius 3?',
            options: ['6π', '9π', '18π', '27π'],
            correct: 1,
            explanation: 'Area = πr² = π(3)² = 9π'
        },
        {
            type: 'trueFalse',
            question: 'A parallelogram always has all sides equal in length.',
            correct: false,
            explanation: 'A parallelogram only requires opposite sides to be equal. A rhombus is a special parallelogram where all sides are equal.'
        },
        {
            type: 'fillBlank',
            question: 'In a right triangle, sin(θ) equals opposite divided by ___.',
            correct: ['hypotenuse'],
            explanation: 'SOH-CAH-TOA: Sine = Opposite/Hypotenuse'
        },
        {
            type: 'multiple',
            question: 'What is the Pythagorean theorem?',
            options: ['a + b = c', 'a² + b = c²', 'a² + b² = c²', 'a + b² = c'],
            correct: 2,
            explanation: 'In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²'
        },
        {
            type: 'trueFalse',
            question: 'An equilateral triangle has all angles equal to 60°.',
            correct: true,
            explanation: 'In an equilateral triangle, all three sides and all three angles are equal. Since angles sum to 180°, each angle is 180°/3 = 60°.'
        },
        {
            type: 'fillBlank',
            question: 'The volume of a cube with side length s is s___.',
            correct: ['³', '^3', 'cubed', '3'],
            explanation: 'Volume of a cube = s³ (side length cubed). For example, if s = 2, volume = 2³ = 8.'
        },
        {
            type: 'multiple',
            question: 'How many sides does a hexagon have?',
            options: ['5', '6', '7', '8'],
            correct: 1,
            explanation: 'A hexagon has 6 sides. The prefix "hex" means six.'
        },
        {
            type: 'multiple',
            question: 'What is the sum of exterior angles of any polygon?',
            options: ['180°', '360°', '540°', 'Depends on sides'],
            correct: 1,
            explanation: 'The sum of exterior angles of any convex polygon is always 360°, regardless of the number of sides.'
        },
        {
            type: 'trueFalse',
            question: 'The diagonals of a rectangle are always perpendicular.',
            correct: false,
            explanation: 'Rectangle diagonals bisect each other but are only perpendicular in a square. In a general rectangle, they\'re not perpendicular.'
        }
    ],

    linearAlgebra: [
        {
            type: 'multiple',
            question: 'What is the result of multiplying a 2×3 matrix by a 3×2 matrix?',
            options: ['2×2 matrix', '3×3 matrix', '2×3 matrix', 'Undefined'],
            correct: 0,
            explanation: 'Matrix multiplication (m×n)(n×p) results in an (m×p) matrix. So (2×3)(3×2) = 2×2.'
        },
        {
            type: 'trueFalse',
            question: 'Matrix multiplication is commutative (AB = BA).',
            correct: false,
            explanation: 'Matrix multiplication is generally NOT commutative. AB ≠ BA in most cases.'
        },
        {
            type: 'fillBlank',
            question: 'The determinant of a 2×2 identity matrix is ___.',
            correct: ['1', 'one'],
            explanation: 'The identity matrix has 1s on the diagonal and 0s elsewhere. For a 2×2 identity, det = (1)(1) - (0)(0) = 1.'
        },
        {
            type: 'multiple',
            question: 'What is a vector with magnitude 1 called?',
            options: ['Null vector', 'Unit vector', 'Zero vector', 'Basis vector'],
            correct: 1,
            explanation: 'A unit vector has magnitude (length) equal to 1. It\'s often used to indicate direction.'
        },
        {
            type: 'trueFalse',
            question: 'The transpose of a matrix is obtained by swapping its rows and columns.',
            correct: true,
            explanation: 'For matrix A, the transpose Aᵀ has element (Aᵀ)ᵢⱼ = Aⱼᵢ. Rows become columns and vice versa.'
        },
        {
            type: 'fillBlank',
            question: 'A system of linear equations has no solution when the lines are ___.',
            correct: ['parallel'],
            explanation: 'Parallel lines never intersect, so the system has no solution (inconsistent system).'
        },
        {
            type: 'multiple',
            question: 'What is the dot product of vectors [1,2] and [3,4]?',
            options: ['7', '11', '14', '20'],
            correct: 1,
            explanation: '[1,2]·[3,4] = (1)(3) + (2)(4) = 3 + 8 = 11'
        },
        {
            type: 'trueFalse',
            question: 'Eigenvectors of a matrix can have eigenvalue 0.',
            correct: true,
            explanation: 'An eigenvalue of 0 means the matrix maps the eigenvector to the zero vector (Av = 0v = 0).'
        },
        {
            type: 'fillBlank',
            question: 'A square matrix is called ___ if it equals its transpose.',
            correct: ['symmetric'],
            explanation: 'A symmetric matrix satisfies A = Aᵀ, meaning aᵢⱼ = aⱼᵢ for all i,j.'
        },
        {
            type: 'multiple',
            question: 'What is the rank of a 3×3 matrix with determinant 0?',
            options: ['0', 'Less than 3', '3', 'Undefined'],
            correct: 1,
            explanation: 'If det(A) = 0, the matrix is singular and its rank is less than 3 (not full rank).'
        }
    ],

    discreteMath: [
        {
            type: 'multiple',
            question: 'How many subsets does a set with 3 elements have?',
            options: ['3', '6', '8', '9'],
            correct: 2,
            explanation: 'A set with n elements has 2ⁿ subsets. For n=3: 2³ = 8 subsets (including empty set and the set itself).'
        },
        {
            type: 'trueFalse',
            question: 'The statement "If P then Q" is logically equivalent to "If not Q then not P".',
            correct: true,
            explanation: 'This is the contrapositive. P→Q is logically equivalent to ¬Q→¬P.'
        },
        {
            type: 'fillBlank',
            question: 'In graph theory, a path that visits every vertex exactly once is called a ___ path.',
            correct: ['Hamiltonian', 'Hamilton'],
            explanation: 'A Hamiltonian path visits each vertex exactly once. A Hamiltonian cycle is a Hamiltonian path that returns to the start.'
        },
        {
            type: 'multiple',
            question: 'What is 5! (5 factorial)?',
            options: ['20', '60', '120', '720'],
            correct: 2,
            explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120'
        },
        {
            type: 'trueFalse',
            question: 'In Boolean algebra, the expression A AND (NOT A) always equals False.',
            correct: true,
            explanation: 'A ∧ ¬A is a contradiction and always evaluates to False (0), regardless of A\'s value.'
        },
        {
            type: 'fillBlank',
            question: 'The number of ways to arrange n distinct objects in a line is n___.',
            correct: ['!', 'factorial'],
            explanation: 'n! (n factorial) gives the number of permutations of n distinct objects.'
        },
        {
            type: 'multiple',
            question: 'How many edges does a complete graph K₅ have?',
            options: ['5', '8', '10', '15'],
            correct: 2,
            explanation: 'A complete graph Kₙ has n(n-1)/2 edges. For K₅: 5(4)/2 = 10 edges.'
        },
        {
            type: 'trueFalse',
            question: 'The empty set is a subset of every set.',
            correct: true,
            explanation: 'By definition, the empty set ∅ is a subset of every set, including itself.'
        },
        {
            type: 'fillBlank',
            question: 'In combinatorics, C(n,k) represents the number of ways to choose k items from n items, and is read as "n choose ___".',
            correct: ['k'],
            explanation: 'C(n,k) or "n choose k" equals n!/(k!(n-k)!) and represents combinations.'
        },
        {
            type: 'multiple',
            question: 'What is the base of the binary number system?',
            options: ['2', '8', '10', '16'],
            correct: 0,
            explanation: 'Binary uses base 2, with only digits 0 and 1. Decimal is base 10, octal is base 8, hexadecimal is base 16.'
        }
    ]
};
